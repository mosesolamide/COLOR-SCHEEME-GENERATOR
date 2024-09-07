document.getElementById("schemeColor").addEventListener("click", updateCurrentColor)
function updateCurrentColor(){
    let colorPicker = document.getElementById("colorPicker").value
    const selected = document.getElementById("selectMode") // this return it as hex value e.g #0000
    // A = 10, B = 11,C = 12, D = 13, E = 14,F = 15
    let red = parseInt(colorPicker.slice(1, 3), 16) // Starts at index 1, ends before index 3  
    let green = parseInt(colorPicker.slice(3, 5), 16)// Starts at index 3, ends before index 5
    let blue = parseInt(colorPicker.slice(5, 7), 16)// Starts at index 5, ends before index 7
    // Explanation:
    // ff in hexadecimal is equivalent to 255 in decimal.
    // The parseInt("ff", 16) converts "ff" from base 16 to base 10.
    // f in hexadecimal is 15, so ff represents:
    // f * 16^1 + f * 16^0 = 15 * 16 + 15 = 240 + 15 = 255.
        const container = document.getElementById("colorListed")
        container.innerHTML =""
        fetch(`https://www.thecolorapi.com/scheme?rgb=${red},${green},${blue}&mode=${selected.value}&count=6&format=json`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(color => {
                let currentColorDiv = document.createElement('div')
                    currentColorDiv.innerHTML =''
                    currentColorDiv.innerHTML = `
                      <img src="${color.image.bare}" alt="${color.name.value}">
                      <p class="color-hex" data-hex="${color.hex.value}">${color.hex.value}</p>
                    `
                    // Append the new color to the container
                    container.appendChild(currentColorDiv);
              })
              const hexElements = document.querySelectorAll(".color-hex");
              hexElements.forEach(element => {
                  element.addEventListener("click", function() {
                      const hexCode = element.getAttribute("data-hex");
                      navigator.clipboard.writeText(hexCode).then(() => {
                          alert(`Copied to clipboard: ${hexCode}`);
                      }).catch(err => {
                          console.error("Failed to copy: ", err);
                      });
                  });
            })
    })
}
