//set

const searchBar = document.querySelector('#search-bar')
const btn = document.querySelector('#btn')
const pokeName = document.querySelector('#pokemon-name')
const health = document.querySelector('#health')
const attack = document.querySelector('#attack')
const defense = document.querySelector('#defense')
const spAtk = document.querySelector('#sp-attack')
const spDef = document.querySelector('#sp-def')
const speed = document.querySelector('#speed')
const pokeImgFront = document.querySelector('#poke-img-front')
const pokeImgBack = document.querySelector('#poke-img-back')
const pokeImgFrontS = document.querySelector('#poke-img-front-shiny')
const pokeImgBackS = document.querySelector('#poke-img-back-shiny')
const pokeNum = document.querySelector('#poke-num')
const pokeType = document.querySelector('#poke-type')
const pokeHeight = document.querySelector('#height')
const pokeWeight = document.querySelector('#weight')
const pokeAbil = document.querySelector('#abilities')
const regionalSprite1 = document.querySelector('#regional-front1')
const regionalPlace1 = document.querySelector('#regional-poke-place1')
const regionalNumber1 =  document.querySelector('#regional-poke-id1')
const regionalSprite2 = document.querySelector('#regional-front2')
const regionalPlace2 = document.querySelector('#regional-poke-place2')
const regionalNumber2 =  document.querySelector('#regional-poke-id2')
const regionalSprite3 = document.querySelector('#regional-front3')
const regionalPlace3 = document.querySelector('#regional-poke-place3')
const regionalNumber3 =  document.querySelector('#regional-poke-id3')
const tooManyForms = document.querySelector('.too-many-forms')

//color chart comes from https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3 courtesy of apaleslimghost
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};



//get

const getName = (pokeValue) => {
    let name = pokeValue.data.name
    console.log(name)
    pokeName.innerHTML = `${name}`
}

const getImages = (pokeValue) => {
    let number = pokeValue.data.id
    let imgFront = pokeValue.data.sprites.front_default
    let imgBack = pokeValue.data.sprites.back_default
    let imgFrontS = pokeValue.data.sprites.front_shiny
    let imgBackS = pokeValue.data.sprites.back_shiny
    console.log(imgFront, imgBack, imgFrontS, imgBackS)
    if (number < 899) {
        pokeImgFront.setAttribute ('src', imgFront)
        pokeImgBack.setAttribute ('src', imgBack)
        pokeImgFrontS.setAttribute ('src', imgFrontS)
        pokeImgBackS.setAttribute ('src', imgBackS)
    } else {
        pokeImgFront.setAttribute ('src', imgFront)
        pokeImgBack.removeAttribute ('src')
        pokeImgFrontS.setAttribute ('src', imgFrontS)
        pokeImgBackS.removeAttribute ('src')
    }
}

const getStats = (pokeValue) => {
    let requestedHealth = pokeValue.data.stats[0].base_stat
    let requestedAtk = pokeValue.data.stats[1].base_stat
    let requestedDef = pokeValue.data.stats[2].base_stat
    let requestedSatk = pokeValue.data.stats[3].base_stat
    let requestedSdef = pokeValue.data.stats[4].base_stat
    let requestedSpd = pokeValue.data.stats[5].base_stat
    console.log(requestedHealth, requestedAtk, requestedDef, requestedSatk, requestedSdef, requestedSpd)
    health.innerHTML = `HP: ${requestedHealth}`
    attack.innerHTML = `Attack: ${requestedAtk}`
    defense.innerHTML = `Defense: ${requestedDef}`
    spAtk.innerHTML = `Special Attack: ${requestedSatk}`
    spDef.innerHTML = `Special Defense: ${requestedSdef}`
    speed.innerHTML = `Speed: ${requestedSpd}`
}

const getInfo = (pokeValue) => {
    let number = pokeValue.data.id
    let height = pokeValue.data.height
    let weight = pokeValue.data.weight
    console.log(number, height, weight)
    pokeNum.innerHTML = `National PokeDex #${number}`
    pokeHeight.innerHTML = `Height: ${height}`
    pokeWeight.innerHTML = `Weight: ${weight}`
}

const typeChecker = (pokeValue) => {
    let typeRequest = pokeValue.data.types 
    if (typeRequest.length === 1) {
        let primaryType = typeRequest[0].type.name
        console.log (primaryType)
        pokeType.innerHTML = `${primaryType.toUpperCase()} type`
        document.body.style.background = colours[primaryType]
    } else if (typeRequest.length === 2) {
        let primaryType = typeRequest[0].type.name
        let secondaryType = typeRequest[1].type.name
        console.log(primaryType, secondaryType)
        pokeType.innerHTML = `${primaryType.toUpperCase()}-${secondaryType.toUpperCase()} type`
        console.log(colours[primaryType])
        console.log(colours[secondaryType])
        document.body.style.background = `linear-gradient(to right, ${colours[primaryType]}, ${colours[secondaryType]})`
    }
}

const abilityChecker = (pokeValue) => {
    let abilityRequest = pokeValue.data.abilities
    console.log(abilityRequest)
    if (abilityRequest.length === 1) {
        let ability1 = abilityRequest[0].ability.name
        pokeAbil.innerHTML = `Ability: ${ability1}`
    } else if (abilityRequest.length === 2) {
        let ability1 = abilityRequest[0].ability.name
        let ability2 = abilityRequest[1].ability.name
        if (abilityRequest[1].is_hidden === false) {
            pokeAbil.innerHTML = `Abilities: ${ability1}, ${ability2}`
        } else {
            pokeAbil.innerHTML = `Abilities: ${ability1}, ${ability2} (hidden)`
        }
    } else if (abilityRequest.length === 3) {
        let ability1 = abilityRequest[0].ability.name
        let ability2 = abilityRequest[1].ability.name
        let ability3 = abilityRequest[2].ability.name
        if (abilityRequest[2].is_hidden === false) {
            pokeAbil.innerHTML = `Abilities: ${ability1}, ${ability2}, ${ability3}`
        } else {
            pokeAbil.innerHTML = `Abilities: ${ability1}, ${ability2}, ${ability3} (hidden)`
        }
    } else if (abilityRequest.length === 4) {
        let ability1 = abilityRequest[0].ability.name
        let ability2 = abilityRequest[1].ability.name
        let ability3 = abilityRequest[2].ability.name
        let ability4 = abilityRequest[3].ability.name
        if (abilityRequest[3].is_hidden === false) {
            pokeAbil.innerHTML = `Abilities: ${ability1}, ${ability2}, ${ability3}, ${ability4}`
        } else {
            pokeAbil.innerHTML = `Abilities: ${ability1}, ${ability2}, ${ability3}, ${ability4} (hidden)`
        }
    } else {
        pokeAbil.innerHTML = "Woah! This pokemon has too many abilities to display. Sorry."
    }
}

const urlToNumber = (requestedUrl) => {
    idArray = [...requestedUrl]
    //console.log(idArray)
    let id = idArray.filter((x => x % 1 === 0))
    id.shift()
    requestedId = id.join('')
    return requestedId
}

const setApiUrl = (newUrl) => {
    return `https://pokeapi.co/api/v2/pokemon/${newUrl}`
}

const setApiUrl2 = (newUrl) => {
    return `https://pokeapi.co/api/v2/pokemon-species/${newUrl}`
}

const varietyNumberChecker = (num, addtnlInfo) => {
    if (addtnlInfo.data.varieties.length > num){
        return  urlToNumber(addtnlInfo.data.varieties[num].pokemon.url)
     } else {
        return 1
     }
}

const idChecker = (pokeValue) => {
    if (pokeValue.data.id > 1200){
        return pokeValue.data.species.name
     } else {
        return  pokeValue.data.id
     }
}

const varietyChecker = (pokeValue, addtnlInfo, pokemonForm1, pokemonForm2, pokemonForm3) => {
    regionalSprite1.removeAttribute ('src')
    regionalSprite2.removeAttribute ('src')
    regionalSprite3.removeAttribute ('src')
    regionalPlace1.innerHTML = ""
    regionalPlace2.innerHTML = ""
    regionalPlace3.innerHTML = ""
    regionalNumber1.innerHTML = ""
    regionalNumber2.innerHTML = ""
    regionalNumber3.innerHTML = ""
    tooManyForms.innerHTML = ""
    let pokeId = addtnlInfo.data.varieties
    let form1Name = pokemonForm1.data.name
    let form1Img = pokemonForm1.data.sprites.front_default
    let form1Num = pokemonForm1.data.id
    let form2Name = pokemonForm2.data.name
    let form2Img = pokemonForm2.data.sprites.front_default
    let form2Num = pokemonForm2.data.id
    let form3Name = pokemonForm3.data.name
    let form3Img = pokemonForm3.data.sprites.front_default
    let form3Num = pokemonForm3.data.id
    console.log(pokeId)
    console.log(form1Name)
    console.log()
    if (pokeId.length === 1) {
        console.log("he's the only one of his kind")
        tooManyForms.innerHTML = `This pokemon has no special variants`
    }
    else if (pokeId.length === 2) {
        regionalSprite2.setAttribute ('src', form1Img)
        regionalPlace2.innerHTML = `${form1Name}`
        regionalNumber2.innerHTML = `Want more info? Search: ${form1Num}`
    } else if (pokeId.length === 3) {
        if (pokeValue.data.name === 'eevee') {
            regionalSprite2.setAttribute ('src', form2Img)
            regionalPlace2.innerHTML = `${form2Name}`
            regionalNumber2.innerHTML = `Want more info? Search: ${form1Num}`
        } else {
            regionalSprite1.setAttribute ('src', form1Img)
            regionalPlace1.innerHTML = `${form1Name}`
            regionalNumber1.innerHTML = `Want more info? Search: ${form1Num}`
            regionalSprite3.setAttribute ('src', form2Img)
            regionalPlace3.innerHTML = `${form2Name}`
            regionalNumber3.innerHTML = `Want more info? Search: ${form2Num}`
        }
    } else if (pokeId.length === 4) {
        regionalSprite1.setAttribute ('src', form1Img)
        regionalPlace1.innerHTML = `${form1Name}`
        regionalNumber1.innerHTML = `Want more info? Search: ${form1Num}`
        regionalSprite2.setAttribute ('src', form2Img)
        regionalPlace2.innerHTML = `${form2Name}`
        regionalNumber2.innerHTML = `Want more info? Search: ${form2Num}`
        regionalSprite3.setAttribute ('src', form3Img)
        regionalPlace3.innerHTML = `${form3Name}`
        regionalNumber3.innerHTML = `Want more info? Search: ${form3Num}`
    } else {
        console.log("that's a lot of meatballs")
        tooManyForms.innerHtml = "Woah! This pokemon has a lot of forms. Let's just look at this one"

    }
}

//Inspired by Rhiannon's code! It looked so good I wanted it. 

//I never got around to implementing it :(


//event listeners

btn.addEventListener('click', async () => {
    let pokemon = searchBar.value.toLowerCase()
    console.log(pokemon)
    let response = await axios.get(
        setApiUrl(pokemon)
    )
    console.log(response)
    let morePokemon = idChecker(response)
     let moreInfo = await axios.get(
         setApiUrl2(morePokemon)
     )
     console.log(moreInfo)

     let pokemon1 = varietyNumberChecker(1, moreInfo)
     console.log(pokemon1)
     let response1 = await axios.get(
         setApiUrl(pokemon1)
     )
     let pokemon2 = varietyNumberChecker(2, moreInfo)
     console.log(pokemon2)
     let response2 = await axios.get(
         setApiUrl(pokemon2)
     )
     let pokemon3 = varietyNumberChecker(3, moreInfo)
     console.log(pokemon3)
     let response3 = await axios.get(
         setApiUrl(pokemon3)
     )
    

    //console.log(moreInfo.data.varieties)
    getName (response)
    getImages (response)
    getStats (response)
    getInfo (response)
    typeChecker (response)
    abilityChecker (response)
    varietyChecker(response, moreInfo, response1, response2, response3)
    console.log('end of search')
    searchBar.value = ''
})