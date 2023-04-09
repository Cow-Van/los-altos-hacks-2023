if (typeof getToken === "function" && typeof getData === "function") {
    onLoad();
} else {
    window.addEventListener("load", onLoad);
}

async function onLoad() {
    var token = await getToken();

    if (!token) {
        return window.location.replace("/login.html");
    }
    
    const breakfast = await (await getData("/api/recipes?meal_of_day=Breakfast&limit=3")).json();
    const lunch = await (await getData("/api/recipes?meal_of_day=Lunch&limit=3")).json();
    const dinner = await (await getData("/api/recipes?meal_of_day=Dinner&limit=3")).json();

    let user = (await (await getData("/api/users/" + breakfast[0]?.author)).json()).user
    document.getElementById("b1").innerHTML = user.first_name + " " + user.last_name;

    document.getElementById("bbox1").innerHTML = `<img src='${breakfast[0]?.image}'><img/>`
}