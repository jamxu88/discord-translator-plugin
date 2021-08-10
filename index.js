const cors = require('cors');
const express = require('express');
const app = express();
const fetch = require('node-fetch')
app.use(cors());
app.use(express.json())

app.listen(3000, function () {
    console.log('Translate Server Enabled')
})

app.get('/', function (req, res, next) {
    res.send("Hello! This is where the Discord Translate server resides to allow for CORS requests.")
})

app.post('/translate', async (req, res) => {
    console.log(req.body)
    await fetch("https://apius.reqbin.com/api/v1/requests", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(
            {"id":"0","name":"","errors":"",
            "json":`{\"method\":\"POST\",\"url\":\"https://www2.deepl.com/jsonrpc?method=LMT_split_into_sentences\",\"apiNode\":\"US\",\"contentType\":\"JSON\",\"content\":\"{\\n            \\\"jsonrpc\\\":\\\"2.0\\\",\\n            \\\"method\\\": \\\"LMT_split_into_sentences\\\",\\n            \\\"params\\\":{\\\"texts\\\":[\\\"${req.body.msg.replace(/(?:\r\n|\r|\n)/g, '')}\\\"],\\n            \\\"lang\\\":{\\n                \\\"lang_user_selected\\\":\\\"auto\\\",\\n                \\\"preference\\\":{\\n                    \\\"weight\\\":{\\n                        \\\"DE\\\":0.02,\\n                        \\\"EN\\\":2.33,\\\"ES\\\":0.02,\\\"FR\\\":0.02,\\\"IT\\\":0.03,\\\"JA\\\":1.7,\\\"NL\\\":0.01,\\\"PL\\\":0.01,\\\"PT\\\":0.01,\\\"RU\\\":1.19,\\\"ZH\\\":0.71,\\\"BG\\\":0.01,\\\"CS\\\":0.01,\\\"DA\\\":0.01,\\\"EL\\\":0.01,\\\"ET\\\":0.01,\\\"FI\\\":0.02,\\\"HU\\\":0.01,\\\"LT\\\":0.01,\\\"LV\\\":0.01,\\\"RO\\\":0.01,\\\"SK\\\":0.01,\\\"SL\\\":0.01,\\\"SV\\\":0.01},\\\"default\\\":\\\"default\\\"\\n                    }\\n                }\\n            },\\n            \\\"id\\\":0}\",\"headers\":\"\",\"errors\":\"\",\"curlCmd\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://www2.deepl.com/jsonrpc?method=LMT_split_into_sentences\"}`,"deviceId":"","sessionId":""}
        )
    }).then(async resp => {
        await resp.json().then(async r => {
            var l = (JSON.parse(r.Content).lang)
            await fetch("https://apius.reqbin.com/api/v1/requests", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({"id":"0","name":"","errors":"","json":`{\"method\":\"POST\",\"url\":\"https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs\",\"apiNode\":\"US\",\"contentType\":\"JSON\",\"content\":\"{\\\"jsonrpc\\\":\\\"2.0\\\",\\\"method\\\": \\\"LMT_handle_jobs\\\",\\\"params\\\":{\\\"jobs\\\":[{\\\"kind\\\":\\\"default\\\",\\\"raw_en_sentence\\\":\\\"${req.body.msg.replace(/(?:\r\n|\r|\n)/g, '')}\\\",\\\"raw_en_context_before\\\":[],\\\"raw_en_context_after\\\":[],\\\"preferred_num_beams\\\":4,\\\"quality\\\":\\\"fast\\\"}],\\\"lang\\\":{\\\"preference\\\":{\\\"weight\\\":{\\\"DE\\\":0.02,\\\"EN\\\":1.87,\\\"ES\\\":0.03,\\\"FR\\\":0.02,\\\"IT\\\":0.05,\\\"JA\\\":0.83,\\\"NL\\\":0.01,\\\"PL\\\":0.01,\\\"PT\\\":0.01,\\\"RU\\\":0.58,\\\"ZH\\\":0.35,\\\"BG\\\":0,\\\"CS\\\":0.01,\\\"DA\\\":0.01,\\\"EL\\\":0,\\\"ET\\\":0.01,\\\"FI\\\":0.03,\\\"HU\\\":0.01,\\\"LT\\\":0.01,\\\"LV\\\":0.01,\\\"RO\\\":0.01,\\\"SK\\\":0.01,\\\"SL\\\":0.01,\\\"SV\\\":0.01},\\\"default\\\":\\\"default\\\"},\\\"source_lang_user_selected\\\":\\\"${l}\\\",\\\"target_lang\\\":\\\"EN\\\"},\\\"priority\\\":-1,\\\"commonJobParams\\\":{\\\"formality\\\":null},\\\"timestamp\\\":1628568271001},\\\"id\\\":97900012}\",\"headers\":\"\",\"errors\":\"\",\"curlCmd\":\"\",\"auth\":{\"auth\":\"noAuth\",\"bearerToken\":\"\",\"basicUsername\":\"\",\"basicPassword\":\"\",\"customHeader\":\"\",\"encrypted\":\"\"},\"compare\":false,\"idnUrl\":\"https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs\"}`,"deviceId":"","sessionId":""})
            }).then(async resp => {
                await resp.json().then(async r => {
                    console.log(r.Content)
                    var con = JSON.parse(r.Content).result.translations[0].beams[0].postprocessed_sentence
                    res.send(con)
                })
            })
        })
    })
})