// based on https://github.com/razagill/tumblr-random-posts
import axios from 'axios'
import cheerio from 'cheerio'

export default function tumblrRandomPost () {

    var log, settings;
    settings = {
        blogName: "poeticalbot.tumblr.com",
        appKey: "soMpL6oJLZq5ovoVYVzU5Qhx5DE87MMrxou6J7tGYLec6XeT6L",
        debug: false
    }
    return new Promise((resolve, reject) => {
        const apiUrl = "http://api.tumblr.com/v2/blog/" + settings.blogName + "/posts?api_key=" + settings.appKey
        axios.get(apiUrl)
            .then((response) => {
                console.log(response)
                const rndPost = Math.floor(Math.random() * response.data.response.total_posts);
                return rndPost
            }, (err) => {
                console.log(err)
                reject(err)
            })
            .then(postId => {
                axios.get(apiUrl + `&offset=${postId}&limit=1`)
                    .then((response) => {
                        const html = response.data.response.posts[0].body
                        const body = cheerio.load(html)
                        resolve(body.text())
                    })
            })
    })
}