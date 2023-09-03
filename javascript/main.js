// ? get categories functions


let contRow = document.querySelector(".row");
let res;
let recipe;
let pgflag = 'c';


addingListeners(); 

function pageHandling(a) {
    console.log(a);
    switch (a) {
        case "Area":
            document.querySelector(".categories").classList.add("d-none")
            // document.querySelector(".search").classList.add("d-none")
            // document.querySelector(".ingred").classList.add("d-none")
            // document.querySelector(".contact").classList.add("d-none")

            document.querySelector('.area').classList.remove("d-none")//show area page
            //activate
            showAreapg()
            
            break;
        case "Categories":
            document.querySelector(".area").classList.add("d-none")
              // document.querySelector(".search").classList.add("d-none")
            // document.querySelector(".ingred").classList.add("d-none")
            // document.querySelector(".contact").classList.add("d-none")

            
            document.querySelector('.categories').classList.remove("d-none")//show area page
            showCatpg()

            break;
        
            case "Ingredients":
                document.querySelector(".area").classList.add("d-none")
                // document.querySelector(".search").classList.add("d-none")
              // document.querySelector(".ingred").classList.add("d-none")
              // document.querySelector(".contact").classList.add("d-none")
  
              
              document.querySelector('.categories').classList.remove("d-none")//show area page
                showIngpg()
    
                break;
        
        
        default:
            break;
    }
}

function addingListeners() {

    let layers = document.querySelectorAll(".layer");
    console.log(pgflag);
    layers.forEach(layer => {
        layer.addEventListener('click', function () {
            // getCat(layer.firstElementChild.innerHTML);
            
            switch (pgflag) {
                case 'c':
                    pgflag ='m';//meal
                    getCat(layer.firstElementChild.innerHTML);
                    break;
                
                case 'm':
                    console.log(layer.lastElementChild.innerHTML);
                    getRecipe(layer.lastElementChild.innerHTML);
                    
                default:
                    break;
            }
            
        });
    });
}


async function getCat(cat) {
    console.log("get category");
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    res = await (x.json());
    display(res);
    
}

function display(arry) {

    let rowDiv = "";

    for (i=0 ; i<arry.meals.length;i++) {

        rowDiv = rowDiv + `  <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
        <img class="w-100" src=${res.meals[i].strMealThumb} alt="beef"/>
            <figcaption class="layer  p-2 d-flex align-items-center">
                <h3>${res.meals[i].strMeal} </h3>
                <p class='d-none'> ${res.meals[i].idMeal}</p>
            </figcaption>
        </figure>
    </div>`;
    };


    console.log(rowDiv);
    if (pgflag == 'a') { document.querySelector(" .area .row").innerHTML = rowDiv; }
    else {
        contRow.innerHTML = rowDiv;
        addingListeners();
    }

    pgflag = 'm';
    addingListeners();

}


async function getRecipe(id) {
    
    console.log("get recipe");
    console.log(id);
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    // console.log(x)
    recipe = await (x.json());
    console.log(recipe)
    displayRecipe(recipe.meals);


}

function displayRecipe(recipe) {

    console.log(recipe);
    
    let rowDiv = ``;


    rowDiv += `
    
    <div class="col-md-4">
    <figure class="">
        <img class="w-100" src=${recipe[0].strMealThumb} alt="beef">
        <figcaption class=" text-center p-2">
         <h2> ${recipe[0].strMeal}</h2>
    </figure>
</div>


<div class="col-md-8">

    <div class="instruct">
        <h5 class="text-white">Instructions</h5>
        <p class="text-white">
        ${recipe[0].strInstructions}
        </p>



        <h6 class="text-white"> <span>Area :</span> ${recipe[0].strArea}</h6>
        <h6 class="text-white"> <span>category :</span> ${recipe[0].strCategory}</h6>

        <h6 class="text-white"> <span>Recipes :</span> 

        ingredient
        </h6>

        `



    for (let i = 1; i <= 20; i++)
    {

        if (recipe[0]['strIngredient' + i] == null || recipe[0]['strIngredient' + i] == "") continue;
        rowDiv += `<p class="text-white d-inline-block p-2 mb-0"> ${recipe[0]['strMeasure'+i]}  ${recipe[0]['strIngredient'+i]}     </p>`

    }
    
        rowDiv += `    
        <h6 class="text-white"> Tags 
        ${recipe[0].strTags}
        </h6>



        <a class="text-white" href="http://www.geniuskitchen.com/recipe/authentic-jamaican-brown-stew-chicken-347996">Source</a>

        <a class="text-white" href=""${recipe[0].strYoutube}>Youtube</a>



    </div>


</div> `


document.querySelector(" .area .row").innerHTML = rowDiv;
    contRow.innerHTML = rowDiv;

 


}


async function getArea(area) {

    console.log(area);
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    res = await (x.json());

    pgflag='a'
    display(res);
    
}

function showCatpg() {
    console.log("hena")
    document.querySelector(".row").innerHTML =`
    <div class="row py-5">
    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/beef.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Beef</h3>
                <p  class="pb-1">Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1]</p>
            </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/chicken.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Chicken</h3>
                <p>Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common</p>                        </figcaption>
        </figure>
    </div>


    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/desert.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Dessert</h3>
                <p>Dessert is a course that concludes a meal. The course usually consists of sweet foods, such as confections dishes or</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/lamb.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Lamb</h3>
                <p>Lamb, hogget, and mutton are the meat of domestic sheep (species Ovis aries) at different ages.

                    A sheep in its first</p>                        </figcaption>
        </figure>
    </div>


    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/miscellaneous.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Miscellaneous</h3>
                <p>General foods that don't fit into another category</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/pasta.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Pasta</h3>
                <p>Pasta is a staple food of traditional Italian cuisine, with the first reference dating to 1154 in Sicily.

                    Also commonly used</p>                        </figcaption>
        </figure>
    </div>



    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/pork.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Pork</h3>
                <p>Pork is the culinary name for meat from a domestic pig (Sus scrofa domesticus). It is the most commonly consumed</p>                        </figcaption>
        </figure>
    </div>


    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/seafood.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Seafood</h3>
                <p>Seafood is any form of sea life regarded as food by humans. Seafood prominently includes fish and shellfish. Shellfish include</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/side.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Side</h3>
                <p>A side dish, sometimes referred to as a side order, side item, or simply a side, is a food item</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/starter.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Starter</h3>
                <p>An entrée in modern French table service and that of much of the English-speaking world (apart from the United States</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/vegan.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Vegan</h3>
                <p>Veganism is both the practice of abstaining from the use of animal products, particularly in diet, and an associated philosophy</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/vegetarian.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Vegetarian</h3>
                <p>Vegetarianism is the practice of abstaining from the consumption of meat (red meat, poultry, seafood, and the flesh of any</p>                        </figcaption>
        </figure>
    </div>


    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/breakfast.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Breakfast</h3>
                <p>Breakfast is the first meal of a day. The word in English refers to breaking the fasting period of the</p>                        </figcaption>
        </figure>
    </div>

    <div class="col-md-3">
        <figure class="position-relative overflow-hidden">
            <img class="w-100" src="./images/categories/goat.png" alt="beef"/>
            <figcaption class="layer text-center p-2">
                <h3>Goat    </h3>
                <p>The domestic goat or simply goat (Capra aegagrus hircus) is a subspecies of C. aegagrus domesticated from the wild goat</p>                        </figcaption>
        </figure>
    </div>






</div>`
}


function showAreapg() {
    document.querySelector('.area .row').innerHTML = `
    <div class="row py-5 g-4">
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">American</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">british</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">canadian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">chinese</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">croatian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">dutch</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">egyptian</h5>
    </div>




    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">filipino</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">french</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">greek</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">indian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">irish</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">italian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">jamaican</h5>
    </div>-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">italian</h5>
</div>
<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">jamaican</h5>
</div>


<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">japanese</h5>
</div>

<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">kenyan</h5>
</div>

<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">malaysian</h5>
</div>
<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">mexican</h5>
</div>
<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">moroccan</h5>
</div>
<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">polish</h5>
</div>
<div class="col-md-3 text-cen


    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">japanese</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">kenyan</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs--white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">italian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">jamaican</h5>
    </div>


    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">japanese</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">kenyan</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">malaysian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">mexican</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">moroccan</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">polish</h5>
    </div>
    <div class="col-md-3 text-cen3 fw-bold">malaysian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">mexican</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">moroccan</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">polish</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">portuguese</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">russian</h5>
    </div>


    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">spanish</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">thai</h5>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">tunisian</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">turkish</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">unknown</h5>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-house-laptop fa-4x " style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">vietnamese</h5>
    </div>


</div>`
}

function showIngpg() {
    
    document.querySelector('.row').innerHTML = `    <div class="row py-5 g-3">
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">chicken</h5>
        <p class="fs-6">The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of</p>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">salmon</h5>
        <p class="fs-6">Salmon is the common name for several species of ray-finned fish in the family Salmonidae. Other fish in the same</p>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">beef</h5>
        <p class="fs-6">Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">pork</h5>
        <p class="fs-6">Pork is the culinary name for the flesh of a domestic pig (Sus scrofa domesticus). It is the most commonly</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">avocado</h5>
        <p class="fs-6">The avocado, a tree with probable origin in South Central Mexico, is classified as a member of the flowering plant</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">apple cider vinegar</h5>
        <p class="fs-6">Apple cider vinegar, or cider vinegar, is a vinegar made from fermented apple juice, and used in salad dressings, marinades,</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">asparagus</h5>
        <p class="fs-6">Asparagus, or garden asparagus, folk name sparrow grass, scientific name Asparagus officinalis, is a perennial flowering plant species in the</p>
    </div>




    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">aubergine</h5>
        <p class="fs-6">Eggplant (US, Australia), aubergine (UK), or brinjal (South Asia and South Africa) is a plant species in the nightshade family</p>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">baby plum tomatoes</h5>
        <p class="fs-6">The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The</p>
    </div>

    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">bacon</h5>
        <p class="fs-6">Bacon is a type of salt-cured pork. Bacon is prepared from several different cuts of meat, typically from the pork</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">baking powder</h5>
        <p class="fs-6">Baking powder is a dry chemical leavening agent, a mixture of a carbonate or bicarbonate and a weak acid. The</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">balsamic vinegar</h5>
        <p class="fs-6">Balsamic vinegar (Italian: aceto balsamico), occasionally shortened to balsamic, is a very dark, concentrated, and intensely flavoured vinegar originating in</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">basil</h5>
        <p class="fs-6">Basil, also called great basil, is a culinary herb of the family Lamiaceae (mints).

            Basil is native to tropical regions from</p>
    </div>
    <div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
        <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
        <h5 class="fs-3 fw-bold">basil leaves</h5>
        <p class="fs-6">Basil, also called great basil, is a culinary herb of the family Lamiaceae (mints).
        </p>

    </div>-
<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">basmati rice</h5>
    <p class="fs-6">Basmati is a variety of long, slender-grained aromatic rice which is traditionally from the Indian subcontinent. As of 2018-19, India</p>
</div>


<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">bay leaf</h5>
    <p class="fs-6">The bay leaf is an aromatic leaf commonly used in cooking. It can be used whole, or as dried and</p>
</div>

<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">beef brisket</h5>
    <p class="fs-6">Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
</div>

<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">beef fillet</h5>
    <p class="fs-6">Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
</div>
<div class="col-md-3 text-center text-white text-capitalize fs-1" onclick="getArea(this.lastElementChild.innerHTML)">
    <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
    <h5 class="fs-3 fw-bold">beef gravy</h5>
    <p class="fs-6">Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
</div>




</div>`
}


async function getIng(ing) {

    console.log(ing);
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ing}`);
    res = await (x.json());

    pgflag='a'
    display(res);
    
}