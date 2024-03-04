const lodeData = async () => {
    toggleShowSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    displayShowData(data.posts)

    setTimeout(() => {
        toggleShowSpinner(false);
    }, 2000)

};
// show all posts
const displayShowData = (data) => {
    const cardContainer = document.getElementById('all-posts');
    cardContainer.innerHTML = '';
    data.forEach((post) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div id="all-posts" class="card card-side bg-base-100 bg-[#F3F3F5]  transition">
        <div class="mt-6">
            <figure><img class="w-20 h-20 rounded-xl ml-10  relative" src="${post.image}" alt="Movie" /></figure>
            <div class="w-4 h-4 rounded-full ${post.isActive ? 'bg-green-500' : 'bg-red-500'} absolute top-4 left-28"></div>
        </div>
        <div class="card-body">
            <div class="flex-1 lg:flex lg:gap-5">
                <h4># ${post.category}</h4>
                <h4>Author : ${post.author.name}</h4>
            </div>
            <h2 class="card-title">${post.title}</h2>
            <p>${post.description}</p>
            <hr class="border-dashed border-2">
            <div class="flex-1 space-y-2 lg:flex justify-between">
                <div class="flex-1 lg:flex lg:gap-6">
                    <div class="flex items-center justify-center gap-2">
                        <img src="./images/sms.png" alt="">
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <img src="./images/eye.png" alt="">
                        <p> ${post.view_count}</p>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <img src="./images/clock.png" alt="">
                        <p>${post.posted_time} min</p>
                    </div>

                </div>
                <button onclick="outSideData('${post.title}' , '${post.view_count}',)"><img src="./images/email.png" alt=""></button>
    
            </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(newDiv);
    });
};

// out Side Data load and count value add
const outSideData = (title, view) => {
    
    const outSideContainer = document.getElementById('mark-as-read');
    
    const outSideDiv = document.createElement('div');

    const countValue = document.getElementById('count-value');

    outSideDiv.className = 'flex bg-white rounded-lg p-4';
    outSideDiv.innerHTML = `
    <p class="w-[200px] text-black font-bold">${title}</p>
    <div class="flex items-center justify-center">
        <img src="./images/eye.png" alt="">
        <p>${view}</p>
    </div>
    `;
    outSideContainer.appendChild(outSideDiv);

    const incrementCount = () => {
        let countTextNumber = parseInt(countValue.innerText);
        countTextNumber += 1;
        countValue.innerText = countTextNumber;
    }
    incrementCount()
};

// search field
const searchButton = () => {
    toggleShowSpinner(true);
    const searchField = document.getElementById('search-field').value;
    showSearchResult(searchField);
}

// search result
const showSearchResult = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();

    const fullSearchResult = data.posts;

    displayShowData(fullSearchResult);
    setTimeout(() => {
        toggleShowSpinner(false);
        document.getElementById('search-field').value = '';
    }, 2000);
}

// latest news show
const latestNews = async () => {
    toggleShowLatestPostSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestNews = document.getElementById('latest-post');
    data.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'card w-full bg-base-100 p-6';
        itemDiv.innerHTML = `
        
        <figure><img src="${item.cover_image}"
                alt="Shoes" /></figure>
        <div class="mt-4 space-y-3">
            <div class="flex gap-2">
                <img src="./images/calander.png" alt="">
                <p>${item.author?.posted_date || "No Publish Date"}</p>
            </div>
            <h2 class="card-title font-bold">${item.title}</h2>
            <p>${item.description}</p>
            <div class="flex items-center gap-3">
                <img class="w-11 h-11 rounded-full" src="${item.profile_image}" alt="">
                <div>
                    <h4 class="text-xl font-semibold">${item.author.name}</h4>
                    <p>${item.author?.designation || "Unknown"}</p>
                </div>
            </div>
        </div>
    
        `;
        latestNews.appendChild(itemDiv);
    });
    setTimeout(() => {
        toggleShowLatestPostSpinner(false);
    }, 2000)
};

// spinner show function
const toggleShowSpinner = (isLoading) => {
    const spinner = document.getElementById('show-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
};
const toggleShowLatestPostSpinner = (isLoading) => {
    const spinner = document.getElementById('latest-post-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
};

lodeData();
latestNews();