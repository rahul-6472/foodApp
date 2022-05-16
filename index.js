const getData = async () => {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let data = await res.json();

    localStorage.setItem("foodCategories", JSON.stringify(data.categories));
  } catch (err) {
    console.log(err);
  }
};
getData();
let categoryData = JSON.parse(localStorage.getItem("foodCategories"));
const displayData = (data) => {
  data.forEach((category) => {
    let option = document.createElement("option");
    option.innerText = category.strCategory;

    document.getElementById("categorySelect").append(option);
  });
};
displayData(categoryData);

const getFood = async () => {
  let categorySelected = document.getElementById("categorySelect").value;
  try {
    let foods = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySelected}`
    );
    let foodData = await foods.json();

    displayFoods(foodData.meals);
  } catch (err) {
    console.log(err);
  }
};

const displayFoods = (allfoodData) => {
  document.getElementById("foodContainer").innerHTML = "";
  allfoodData.forEach((categories) => {
    let foodCard = document.createElement("div");

    let image = document.createElement("img");
    image.src = categories.strMealThumb;

    let foodName = document.createElement("p");
    foodName.textContent = categories.strMeal;

    foodCard.append(image, foodName);
    document.getElementById("foodContainer").append(foodCard);
  });
};
