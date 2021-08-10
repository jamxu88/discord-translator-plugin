setInterval(function(){
    if(document.getElementsByClassName("menu-3sdvDG").length > 0) {
        if(document.getElementsByClassName("submenuContainer-2gbm7M")[0].childNodes[0].childNodes[0] == undefined) {
            document.getElementsByClassName("submenuContainer-2gbm7M")[0].insertAdjacentHTML('afterBegin','<div class="item-1tOPte labelContainer-1BLJti colorDefault-2K3EoJ" role="menuitem" id="message-translate" tabindex="-1"><div class="label-22pbtT">Translate Message</div></div>');
            document.getElementById("message-translate").addEventListener("click", async (e) => {
                var og;
                document.getElementsByClassName("selected-2P5D_Z")[0].childNodes[0].childNodes[1].outerHTML.includes("header") ? og = (document.getElementsByClassName("selected-2P5D_Z")[0].childNodes[0].childNodes[2].textContent) : og = (document.getElementsByClassName("selected-2P5D_Z")[0].childNodes[0].childNodes[1].textContent)
                console.log(og)
                await fetch("http://127.0.0.1:3000/translate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        msg: og
                    })
                }).then(async resp => {
                    var t = await resp.text()
                    console.log(t)
                    document.getElementsByClassName("selected-2P5D_Z")[0].childNodes[0].childNodes[1].outerHTML.includes("header") ? document.getElementsByClassName("selected-2P5D_Z")[0].childNodes[0].childNodes[2].textContent = t : document.getElementsByClassName("selected-2P5D_Z")[0].childNodes[0].childNodes[1].textContent = t
                })
            })
        }
    }
}, 1000)

