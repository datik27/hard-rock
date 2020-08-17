//common function for all
let searchBox=document.getElementById('searchBox')
let searchButton=document.getElementById('searchButton')
let songList = document.getElementById("songList")
let lyricsList = document.getElementById("lyricsList")

// lyrics suggestion working section start 
searchBox.addEventListener("keypress",event=>{
    if(searchBox.value.length>0){
        searchBox.style.color="black"
    }
    
    let api=`https://api.lyrics.ovh/suggest/${event.target.value+event.key}`
    

    fetch(api)
    .then(res=>res.json())
    .then(data=>{
        
        for(let i=1; i<=5; i++){
           document.getElementById("title"+i).innerText=data.data[i].title
           document.getElementById("artist"+i).innerText=data.data[i].artist.name


           let title=data.data[i].title
            let artist=data.data[i].artist.name
            document.getElementById("lyricsBtn"+i).addEventListener("click",(event)=>{
               let api2=`https://api.lyrics.ovh/v1/${artist}/${title}`
                fetch(api2)
                .then(res=>res.json())
                .then(data=>{
                    let str=data.lyrics.split(" ")
                    let [a,b,c]=str
                    if(str.length>10){
                        document.getElementById("lyricsContentTitle").innerText=`${a} ${b} ${c}`
                    }else{
                        document.getElementById("lyricsContentTitle").innerText=`${a}`
                    }
                    document.getElementById("textContent").innerText=data.lyrics
                })
                document.getElementById("lyricsContent").style.display="block"
            })
        }
        songList.style.display="block"
    })
})
// lyrics suggestion working section start 

//get song results working section start

searchButton.addEventListener('click',event=>{
    if(searchBox.value.length<1){

        let searchBox = document.getElementById("searchBox")
        searchBox.value="type a lyrics name"
        searchBox.style.color="red"
        document.getElementById("lyricsList").style.display="none"

       
        
    }else{
        searchBox.style.color="black"
    let api = `https://api.lyrics.ovh/suggest/${searchBox.value}`
    document.getElementById("lyricsContent").style.display="none"
    for(let i=1; i<=10;i++){
        document.getElementById("textContent"+i).style.display="none"
    }
    fetch(api)
    .then(res=>res.json())
    .then(data=>{
        if(data.data.length==0){
            document.getElementById("alertUnavailable").innerHTML=`<h4 style="color:red; text-align:center">sorry this lyrics is not available right now</h4>`
        }else{
            for(let i=1; i<data.data.length; i++){
            
                document.getElementById("lyricsTitle"+i).innerHTML=data.data[i].title
                document.getElementById("lyricsArtist"+i).innerHTML=data.data[i].artist.name
                document.getElementById("play"+i).innerHTML=`<a target="_blank" href="${data.data[i].link}">Play</a>`
                // console.log(data.data[i].link)

                lyricsList.style.display="block"
                let count=1;
                document.getElementById("getLyricsBtn"+i).addEventListener("click",event=>{
                    
                    let textContent=document.getElementById("textContent"+i)
    
                    let title=data.data[i].title
                    let artist=data.data[i].artist.name
                    let api2=`https://api.lyrics.ovh/v1/${artist}/${title}`
                    fetch(api2)
                    .then(res=>res.json())
                    .then(data=>{
                        // console.log(data.lyrics)
                        if(data.lyrics==undefined){
                            textContent.innerHTML=`<p style="color:red; text-align:center;">At this time, this lyrics is not available , Please try again later</p>`
                                textContent.style.display="block"
                                
                        }else{
                            if(count%2!==0){
                                textContent.innerHTML=data.lyrics
                                textContent.style.display="block"
                                
                                count++
                               }else{
                                textContent.style.display="none"
                                count++
                               }
                            
                        }
                        
                    })
                    
                })
                
            }
        }
    })
    
    songList.style.display="none"

}
   
})
