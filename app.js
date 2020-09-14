const { manhuaRssHub } = require("./util/manhua");
const issue = require("./util/issue.js");

// run weekly at 00:01 UTC
const run = async () => {
    const zhenhunjies = await manhuaRssHub({
        url: "https://m.gufengmh8.com/manhua/zhenhunjie/",
    });

    let result = await issue.list({
        owner: "xiaojia21190",
        repo: "zhenhunjie",
    });
    console.log("all issue =========");
    console.log(result.data.length);
    if (zhenhunjies.length === result.data.length) return;
    if (zhenhunjies.length > result.data.length) {
        let zhenhunjie = zhenhunjies.slice(
            result.data.length,
            zhenhunjies.length
        );
        console.log("add issue =========");
        console.log(zhenhunjie.length);
        for (let i = 0; i < zhenhunjie.length; i++) {
            const element = zhenhunjie[i];
            const res = await issue.open({
                owner: "xiaojia21190",
                repo: "zhenhunjie",
                title: `${element.title}`,
                body: element.imageData.join(" "),
            });

            const issueNumber = res.data.number;

            await issue.lock({
                owner: "xiaojia21190",
                repo: "zhenhunjie",
                issueNumber,
            });
        }
    }
};

run();