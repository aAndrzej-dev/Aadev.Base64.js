const Base64 = {
    Encode:  (orginal) => {
       const BASE64CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
       let output="";
        for (let i = 0; i < orginal.length; i += 3)
        {
            output += BASE64CHARS[orginal.charCodeAt(i + 0) >>> 2];
            if (i + 1 < orginal.length) {
                output += BASE64CHARS[(orginal.charCodeAt(i + 0) & 0b00000011) << 4 | orginal.charCodeAt(i + 1) >>> 4];

                if (i + 2 < orginal.length) {

                    output += BASE64CHARS[(orginal.charCodeAt(i + 1) & 0b00001111) << 2 | orginal.charCodeAt(i + 2) >>> 6];
                    output += BASE64CHARS[orginal.charCodeAt(i + 2) & 0b00111111];
                }
                else {
                    output += BASE64CHARS[(orginal.charCodeAt(i + 1) & 0b00001111) << 2];
                    output += "=";
                }

            }
            else {
                output += BASE64CHARS[(orginal.charCodeAt(i + 0) & 0b00000011) << 4];
                output += "==";
            }
        }

        return output;
    },
    Decode: (base64string) => {
        if (base64string.length % 4 != 0)
            return undefined;
        
        const BASE64CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let output = "";


        for (let i = 0; i < base64string.length; i += 4)
        {
            let g0 = BASE64CHARS.indexOf(base64string[i + 0]);
            let g1 = BASE64CHARS.indexOf(base64string[i + 1]);
            let g2 = BASE64CHARS.indexOf(base64string[i + 2]);
            let g3 = BASE64CHARS.indexOf(base64string[i + 3]);
            output += String.fromCharCode(g0 << 2 | g1 >>> 4);

            if (g2 != -1) {
                output += String.fromCharCode((g1 & 0b00001111) << 4 | (g2 >>> 2));

                if (g3 != -1) {
                    output += String.fromCharCode((g2 & 0b00000011) << 6 | g3);

                }
            }
        }
        return output;
    }
};
