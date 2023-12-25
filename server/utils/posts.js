const { DateTime } = require('luxon');
function preparPost(post) {
    post.date = DateTime.fromSQL(post.date).toFormat('dd-MM-yyyy');
    delete post.first_name;
    delete post.last_name;
    delete post.email;
    delete post.address;
    delete post.city;
    delete post.state;
    delete post.zip;
    delete post.phone;
    delete post.pass;
}

function preparPosts(posts) {
    posts.forEach(preparPost);
}

module.exports = { preparPost, preparPosts }