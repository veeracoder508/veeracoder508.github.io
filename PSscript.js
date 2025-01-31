function convert() {
    const inputValue = document.getElementById("inputValue").value;
    const inputType = document.getElementById("inputType").value;
    const outputType = document.getElementById("outputType").value;
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output


    let decimalValue;

    // Convert to decimal first
    switch (inputType) {
        case "binary":
            decimalValue = parseInt(inputValue, 2);
            break;
        case "hex":
            decimalValue = parseInt(inputValue, 16);
            break;
        case "octal":
            decimalValue = parseInt(inputValue, 8);
            break;
        case "decimal":
            decimalValue = parseInt(inputValue);
            break;
        case "string":
            decimalValue = "";
            for (let i = 0; i < inputValue.length; i++) {
                decimalValue += inputValue.charCodeAt(i) + " ";
            }
            decimalValue = decimalValue.trim();
            break;
    }

    let outputValue;

    // Convert from decimal to desired output
    switch (outputType) {
        case "binary":
            if (inputType === "string") {
                outputValue = "";
                const charCodes = decimalValue.split(" ");
                for (const code of charCodes) {
                    outputValue += parseInt(code).toString(2) + " ";
                }
                outputValue = outputValue.trim();
            } else {
                outputValue = decimalValue.toString(2);
            }
            break;
        case "hex":
            if (inputType === "string") {
                outputValue = "";
                const charCodes = decimalValue.split(" ");
                for (const code of charCodes) {
                    outputValue += parseInt(code).toString(16) + " ";
                }
                outputValue = outputValue.trim();
            } else {
                outputValue = decimalValue.toString(16);
            }
            break;
        case "octal":
            if (inputType === "string") {
                outputValue = "";
                const charCodes = decimalValue.split(" ");
                for (const code of charCodes) {
                    outputValue += parseInt(code).toString(8) + " ";
                }
                outputValue = outputValue.trim();
            } else {
                outputValue = decimalValue.toString(8);
            }
            break;
        case "decimal":
            outputValue = decimalValue;
            break;
        case "string":
            outputValue = "";
            if (inputType !== "string") {
                const charCodes = decimalValue.toString().split("");
                for (const code of charCodes) {
                   outputValue += String.fromCharCode(parseInt(code));
                }
            } else {
                outputValue = inputValue;
            }
            break;
    }

    outputDiv.innerHTML = outputValue;
}
