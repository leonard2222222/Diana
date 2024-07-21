let currentPage = 1;
let totalPages = 8;

const pages = [
    {
        header: "Buenos dias amor feliz aniversario",
        image: "img/imagen4.png",
        text: ["hoy hace un año al improviso te hice una pregunta.", "la respuesta a esa pregunta nos trajo a este momento ."],
        gif: "img/hojana.gif",
        className: "page1"
    },
    {
        header: "a comenzar una vida juntos",
        image: "img/imagen3.png",
        text: ["con buenos y malos momentos.", "pero siempre querre estar a tu lado amor mio."],
        gif: "img/juntos.gif",
        className: "page2"
    },
    {
        header: "capas no soy el mejor fotografo asi me amas hehe",
        image: "img/imagen6.png",
        text: ["una de las primeras veces que te sorprendi.", "y se que ya no lo hago mucho pero seguira pasando amor ."],
        gif: "img/sorpresa.gif",
        className: "page3"
    },
    {
        header: "me gusta verte feliz cuando comes y gosas la comida",
        image: "img/imagen9.png",
        text: ["aunque tambien me gusta cocinarte y si", "devo cambiar mi forma de alimentarme y lo are amor ntp."],
        gif: "img/chuchi.gif",
        className: "page4"
    },
    {
        header: "pero aun asi estare hay para cuidate",
        image: "img/imagen5.png",
        text: ["aunque lamento no estar siempre para ti en esos momentos", "pero creeme que me encantaria hacerlo amor muchisimo asi te podria cuidar."],
        gif: "img/enferma.gif",
        className: "page5"
    },
    {
        header: "y tambien volver a viajar juntos amor ",
        image: "img/imagen7.png",
        text: ["es una de las cosas que mas me gustaria volver a hacer amor ", "y experimentar las comidas con tigo aunque si aveces me sierro pero me gustaria amor."],
        gif: "img/viaje.gif",
        className: "page6"
    },
    {
        header: "heheheh tu estitch que te cuidara y mucho mas",
        image: "img/imagen8.png",
        text: ["te apollare siempre por que hojana es familia.", "y tu eres mi familia amor."],
        gif: "img/stitch.gif",
        className: "page7"
    },
    {
        header: "me das pas y eres lo mejor que tengo amor ",
        image: "img/imagen1.png",
        text: ["darte lo mejor de mi es mi meta lamento mucho si no lo estoy logrando amor.", "pero no me rendire quiero hacerte feliz y estar con tigo toda mi vida"],
        gif: "img/paz.gif",
        className: "page8"
    },
];

function navigate(direction) {
    currentPage += direction;

    // Ensure the current page number is within bounds
    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    updatePageContent(currentPage);
}

function updatePageContent(page) {
    const pageData = pages[page - 1];

    document.getElementById('headerText').textContent = pageData.header;
    document.getElementById('contentImage').src = pageData.image;

    const contentText = document.getElementById('contentText');
    contentText.innerHTML = "";
    pageData.text.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        contentText.appendChild(p);
    });

    document.getElementById('pageGif').src = pageData.gif;
    document.body.className = pageData.className;

    // Update the page number display
    document.getElementById('pageNumber').textContent = currentPage;

    // Update the state of the buttons
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('prevButton').classList.toggle('disabled', currentPage === 1);
    document.getElementById('nextButton').disabled = currentPage === totalPages;
    document.getElementById('nextButton').classList.toggle('disabled', currentPage === totalPages);
}

function showEditPanel() {
    document.getElementById('editPanel').classList.add('open');
    const pageData = pages[currentPage - 1];
    populateEditFields(pageData);
}

function populateEditFields(pageData) {
    document.getElementById('editHeader').value = pageData.header || '';
    document.getElementById('editText1').value = pageData.text[0] || '';
    document.getElementById('editText2').value = pageData.text[1] || '';
    document.getElementById('editImageFile').value = ''; // Clear file input
    document.getElementById('editGifFile').value = ''; // Clear file input
}

function saveChanges() {
    const header = document.getElementById('editHeader').value;
    const imageFile = document.getElementById('editImageFile').files[0];
    const text1 = document.getElementById('editText1').value;
    const text2 = document.getElementById('editText2').value;
    const gifFile = document.getElementById('editGifFile').files[0];

    if (imageFile || gifFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updatePageData({
                header,
                image: imageFile ? e.target.result : pages[currentPage - 1].image,
                text: [text1, text2],
                gif: gifFile ? e.target.result : pages[currentPage - 1].gif,
                className: `page${currentPage}`
            });
        };
        reader.readAsDataURL(imageFile || gifFile);
    } else {
        updatePageData({
            header,
            image: pages[currentPage - 1].image,
            text: [text1, text2],
            gif: pages[currentPage - 1].gif,
            className: `page${currentPage}`
        });
    }
}

function updatePageData(data) {
    pages[currentPage - 1] = data;
    updatePageContent(currentPage);
    closeEditPanel();
}

function resetToDefaults() {
    updatePageContent(currentPage);
    closeEditPanel();
}

function closeEditPanel() {
    document.getElementById('editPanel').classList.remove('open');
}

function addPage() {
    const newPageNumber = totalPages + 1;
    pages.push({
        header: `Texto en la Parte Alta de la Página ${newPageNumber}`,
        image: "https://via.placeholder.com/120x140",
        text: [`Esta es la primera línea de texto de la página ${newPageNumber}.`, `Esta es la segunda línea de texto de la página ${newPageNumber}.`],
        gif: "https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif",
        className: `page${newPageNumber}`
    });
    totalPages++;
    currentPage = newPageNumber;
    updatePageContent(currentPage);
}

// Inicializar el contenido de la página
updatePageContent(currentPage);
