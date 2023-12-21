function createPost(post) {
    const cl = document.getElementById("content-list");

    const p = document.createElement("li");
    const title = document.createElement("a");
    const desc = document.createElement("a");
    const time = document.createElement("time");

    title.className = "post_title";
    title.innerHTML = `${post.title}`;
    title.href = `${post.url}`;

    desc.className = "post_desc";
    desc.innerHTML = `${post.description}`;
    desc.href = `${post.url}`;

    date = new Date(post.date_created);
    date_edited = new Date(post.date_last_edited)
    time.className = "post_time"
    time.dateTime = date.toString();
    time.innerHTML = formatDate(date);

    p.classList.add("post");

    p.appendChild(title);
    p.appendChild(desc);
    p.appendChild(time);

    cl.appendChild(p);
}

function createPosts() {
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                createPost(post);
            });
            console.log("Post created")
        });
}


function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dateOfMonth = date.getDate();
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    let timezone = "EST"; // Static timezone, adjust as needed

    return `${day} ${month} ${dateOfMonth} ${year} ${hours}:${minutes} ${ampm} ${timezone}`;
}

createPosts();