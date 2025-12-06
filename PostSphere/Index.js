
let serachQ=document.getElementById("search")
let postsSection=document.getElementById("posts")
let prevBtn=document.getElementById("page-prev")
let currPage=document.getElementById("curr-page")
let nextBtn=document.getElementById("page-next")


let posts=[]
let comments=[]
let curr=1
let size=8


//posts fetch


async function fetchPost() {
    posts=await fetch("https://jsonplaceholder.typicode.com/posts")
                .then(res=>res.json())

                comments=await fetch("https://jsonplaceholder.typicode.com/comments")
                .then(res=>res.json())
    mapPost()
}



//search
function searchFilter(paginated) {
let q=serachQ.value.toLowerCase()

if(!q) return paginated


return paginated.filter(p=>
    p.title.toLowerCase().includes(q) ||
    p.body.toLowerCase().includes(q) 
)
}



//tranformers

function Checkbox(paginated) {
    let check=document.querySelectorAll(".transformers input")

    let long=check[0].checked
    let user1=check[1].checked
    let sortCom=check[2].checked

    let res=[...paginated]

    if(long) {
        res=res.filter(p=>p.body.length>100)
    }

    if(user1) {
        res=res.filter(u=>u.userId==1)
    }

    if(sortCom) {
        res=res.sort((a,b)=>{
            let ac=comments.filter(c1=>c1.postId == a.id).length
            let bc=comments.filter(c2=>c2.postId == b.id).length

            return bc-ac
        })
    }
return res
}



//paaginated post

function paginate(paginated) {
    let st=(curr-1)*size
    return paginated.slice(st,st+size)
}




//map posts

function mapPost() {


let filtered=searchFilter(posts)
let trnsformed=Checkbox(filtered)
let pagePost=paginate(trnsformed)

postsSection.innerHTML=""

pagePost.forEach(e => {
    let div=document.createElement("div")
    div.className="post-card"

    div.innerHTML=`
    <b>Title:${e.title}</b>
    <p>${e.body.substring(0,100)}...</p>
    `
    div.onclick=()=>postInfo(e.id)
    postsSection.appendChild(div)
});

currPage.textContent=curr
}




//post info

async function postInfo(id){
    let post_info=document.getElementById("post-info")

    post_info.classList.remove("hidden")
    postsSection.innerHTML=""
    post_info.innerHTML="Loading..."
    

    const [post,comments]=await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(r => r.json()),
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(r => r.json())
    ])

    post_info.innerHTML=`
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <h3>Comments</h3>
    ${comments.map(c => `<p><strong>${c.email}</strong>: ${c.body}</p>`).join("")}
    `
}


document.getElementById("back-btn").onclick=()=>{
    document.getElementById("post-info").classList.add("hidden")
    document.getElementById("posts").classList.add("block")
}


function debounce(fn, delay = 600) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}


serachQ.addEventListener("input", debounce(() => {
    curr = 1;
    mapPost();
}, 600));


document.querySelectorAll(".transformers input").forEach(box=>{
    box.addEventListener("change",()=>{
        curr=1
        mapPost()
    })
})

prevBtn.onclick=()=>{
    if(curr>1) curr--

    mapPost()
}

nextBtn.onclick=()=>{
    curr++
    mapPost()
}


fetchPost()