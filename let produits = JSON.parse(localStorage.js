let produits = JSON.parse(localStorage.getItem("produits")) || [];
let publicationsVendeur = JSON.parse(localStorage.getItem("vendeurs")) || {};

function previewImage(event){
    let preview = document.getElementById("imagePreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
}

function ajouterProduit(){
    let nom = document.getElementById("nomProduit").value;
    let prix = document.getElementById("prixProduit").value;
    let cat = document.getElementById("categorieProduit").value;
    let contact = document.getElementById("contactVendeur").value;
    let imageInput = document.getElementById("imageProduit");

    if(!nom || !prix || !contact){
        alert("Remplissez tous les champs");
        return;
    }

    if(!publicationsVendeur[contact]){
        publicationsVendeur[contact] = 0;
    }

    if(publicationsVendeur[contact] >= 10){
        let payer = confirm(
            "Vous avez utilisé vos 10 publications gratuites.\n\n"+
            "Pour publier encore vous devez payer 200 FCFA.\n\n"+
            "Cliquez OK pour payer."
        );
        if(payer){
            payerPublication(contact);
            return;
        } else {
            return;
        }
    }

    publierProduit();
}

function publierProduit(){
    let nom = document.getElementById("nomProduit").value;
    let prix = document.getElementById("prixProduit").value;
    let cat = document.getElementById("categorieProduit").value;
    let contact = document.getElementById("contactVendeur").value;
    let imageInput = document.getElementById("imageProduit");

    publicationsVendeur[contact]++;

    let produit = {nom, prix, categorie: cat, contact};

    if(imageInput.files.length > 0){
        produit.image = URL.createObjectURL(imageInput.files[0]);
    } else {
        produit.image = "https://via.placeholder.com/200";
    }

    produits.push(produit);

    localStorage.setItem("produits", JSON.stringify(produits));
    localStorage.setItem("vendeurs", JSON.stringify(publicationsVendeur));

    afficherProduits();

    document.getElementById("nomProduit").value = "";
    document.getElementById("prixProduit").value = "";
    document.getElementById("contactVendeur").value = "";
    document.getElementById("imageProduit").value = "";
    document.getElementById("imagePreview").src = "https://via.placeholder.com/150";

    alert("Produit publié");
}

function payerPublication(contact){
    let numero = "2376XXXXXXXX"; // TON NUMERO
    let message = "Bonjour je veux payer 200 FCFA pour publier un produit sur YbaiTech Market";
    let choix = prompt("Tapez :\n1 pour Orange Money\n2 pour MTN MoMo");

    if(choix == 1 || choix == 2){
        window.open("https://wa.me/"+numero+"?text="+encodeURIComponent(message));
    }
}

function afficherProduits(){
    let section = document.getElementById("produitsSection");
    section.innerHTML = "";

    produits.forEach(p => {
        let div = document.createElement("div");
        div.className = "produit";
        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.nom}</h3>
            <p>${p.prix} FCFA</p>
            <button onclick="contacter('${p.contact}','${p.nom}')">Contacter vendeur</button>
        `;
        section.appendChild(div);
    });
}

function contacter(numero, produit){
    let message = "Bonjour je suis intéressé par votre produit : "+produit;
    window.open("https://wa.me/"+numero+"?text="+encodeURIComponent(message));
}

afficherProduits();