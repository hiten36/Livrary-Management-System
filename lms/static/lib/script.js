books=['book 1','book 2','book 3','book 4'];
books1=[];
users={};
let b1=document.querySelector('.book_list-btn');
b1.addEventListener('click',()=>{
    str='';
    books.forEach((ele,index)=>{
        str+=`<li> ${ele.capitalize()}</li>`;
    })
    document.getElementById('avail').style.display='block';
    if(document.getElementById('book_list').innerHTML=='')
    {
        document.getElementById('book_list').innerHTML=str;
    }
    else
    {
        str=''
        document.getElementById('book_list').innerHTML=str;
    }
})
let b2=document.querySelector('.issue_book-btn');
b2.addEventListener('click',()=>{
    var book1=document.getElementById('book_name').value.toLowerCase();
    var user1=document.getElementById('user_name').value.toLowerCase();
    if(book1!='' || user1!='')
    {
        if(books.includes(book1))
        {
            if(Object.keys(users).includes(user1))
            {
                if(users[user1].length<2)
                {
                    users[user1].push(book1);
                    let i1=books.indexOf(book1);
                    books.splice(i1,1);
                    books1.push(book1);
                    str=`${book1} has been successfully issued to ${user1}`;
                    document.getElementById('message-box1').style.display='block';
                    document.getElementById('mess-para').innerHTML=str;
                    document.getElementById('book_name').value='';
                    document.getElementById('user_name').value='';
                    document.getElementById('book_list').innerHTML='';
                    document.body.scrollTop=document.documentElement.scrollTop=0;
                }
                else
                {
                    str='You cannot issue more than 2 books.';
                    document.getElementById('message-box1').style.display='block';
                    document.getElementById('mess-para').innerHTML=str;
                    book1='';
                    user1='';
                    document.body.scrollTop=document.documentElement.scrollTop=0;
                }
            }
            else
            {
                users[user1]=[book1];
                let i1=books.indexOf(book1);
                console.log(i1)
                books.splice(i1,1);
                books1.push(book1);
                str=`${book1} has been successfully issued to ${user1}`;
                document.getElementById('message-box1').style.display='block';
                document.getElementById('mess-para').innerHTML=str;
                document.getElementById('book_name').value='';
                document.getElementById('user_name').value='';
                document.getElementById('book_list').innerHTML='';
                document.body.scrollTop=document.documentElement.scrollTop=0;
            }
        }
        else
        {
            str='Sorry! The book you are looking for has already been issued.';
            document.getElementById('message-box1').style.display='block';
            document.getElementById('mess-para').innerHTML=str;
            book1='';
            user1='';
            document.body.scrollTop=document.documentElement.scrollTop=0;
        }
    }
    else
    {
        str='Dont leave any field blank.Please fill all fields.';
        document.getElementById('message-box1').style.display='block';
        document.getElementById('mess-para').innerHTML=str;
        document.body.scrollTop=document.documentElement.scrollTop=0;
    }

})
let b3=document.querySelector('.return_book-btn');
b3.addEventListener('click',()=>{
    var book2=document.getElementById('book_name1').value.toLowerCase();
    var user2=document.getElementById('user_name1').value.toLowerCase();
    flag=false;
    if(book2!='' || user2!='')
    {
        if(Object.keys(users).includes(user2))
        {
            if(books1.includes(book2))
            {
                for(i of users[user2])
                {
                    if(i==book2)
                    {
                        flag=true;
                        let n=users[user2].indexOf(i);
                        users[user2].splice(n,1);
                        books.push(book2);
                        let n1=books1.indexOf(book2);
                        books1.splice(n1,1);
                    }
                }
                if(flag)
                {
                    str=`The Book ${book2} has been successfully returned.`;
                    document.getElementById('message-box1').style.display='block';
                    document.getElementById('mess-para').innerHTML=str;
                    document.getElementById('book_name1').value='';
                    document.getElementById('user_name1').value='';
                    document.getElementById('book_list').innerHTML='';
                    document.body.scrollTop=document.documentElement.scrollTop=0;
                }
                else
                {
                    str=`The ${book2} has not been issued to ${user2}`;
                    document.getElementById('message-box1').style.display='block';
                    document.getElementById('mess-para').innerHTML=str;
                    document.getElementById('book_name1').value='';
                    document.getElementById('user_name1').value='';
                    document.getElementById('book_list').innerHTML='';
                    document.body.scrollTop=document.documentElement.scrollTop=0;
                }
            }
            else
            {
                str=`The ${book2} has not been issued to ${user2}`;
                document.getElementById('message-box1').style.display='block';
                document.getElementById('mess-para').innerHTML=str;
                document.getElementById('book_name1').value='';
                document.getElementById('user_name1').value='';
                document.getElementById('book_list').innerHTML='';
                document.body.scrollTop=document.documentElement.scrollTop=0;
            }
        }
        else
        {
            str=`The ${book2} has not been issued to ${user2}`;
            document.getElementById('message-box1').style.display='block';
            document.getElementById('mess-para').innerHTML=str;
            document.getElementById('book_name1').value='';
            document.getElementById('user_name1').value='';
            document.getElementById('book_list').innerHTML='';
            document.body.scrollTop=document.documentElement.scrollTop=0;
        }
    }
    else
    {
        str='Dont leave any field blank.Please fill all fields.';
        document.getElementById('message-box1').style.display='block';
        document.getElementById('mess-para').innerHTML=str;
        document.body.scrollTop=document.documentElement.scrollTop=0;
    }
})
let b4=document.querySelector('.donate_book-btn');
b4.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('yes')
    var book3=document.getElementById('book_name2').value.capitalize();
    var user3=document.getElementById('user_name2').value.capitalize();
    if(book3!='' || user3!='')
    {
        for(i of document.getElementsByName('book_cat'))
        {
            if(i.checked)
            {
                var book_cat=i.nextElementSibling.innerHTML;
            }
        }
        var formdata={
            'book3': document.getElementById('book_name2').value,
            'user3': user3,
            'book_cat':book_cat,
            'csrfmiddlewaretoken':document.getElementsByName('csrfmiddlewaretoken')[0].value
        }
        $.ajax({
            type:'POST',
            url:'',
            data:formdata,
            encode:true
        })
        let cnl=document.getElementById('tbody').children.length-1;
        let cn=document.getElementById('tbody').children[cnl].children[0].innerHTML;
        let newe=document.createElement('tr');
        newe.innerHTML=`<td>${Number(cn)+1}</td>
                        <td>${user3}</td>
                        <td>${book3}</td>
                        <td>${book_cat}</td>`;
        document.getElementById('tbody').appendChild(newe)
        str=`Thank You for your donation! ${book3} has been successfully donated by ${user3}.`;
        document.getElementById('message-box1').style.display='block';
        document.getElementById('mess-para').innerHTML=str;
        document.body.scrollTop=document.documentElement.scrollTop=0;
    }
    else
    {
        str='Dont leave any field blank.Please fill all fields.';
        document.getElementById('message-box1').style.display='block';
        document.getElementById('mess-para').innerHTML=str;
        document.body.scrollTop=document.documentElement.scrollTop=0;
    }
})
if(document.getElementById('login')!=undefined)
{
    document.getElementById('login').addEventListener('click',()=>{
        document.getElementById('mlogin').style.display='block';
    })
}
if(document.getElementById('login')!=undefined)
{
    document.getElementById('signin').addEventListener('click',()=>{
        document.getElementById('msignin').style.display='block';
    })
}
document.querySelector('.close').addEventListener('click',()=>{
    document.getElementById('msignin').style.display='none';
    document.getElementById('mlogin').style.display='none';
})
document.querySelector('.close1').addEventListener('click',()=>{
    document.getElementById('msignin').style.display='none';
    document.getElementById('mlogin').style.display='none';
})

document.addEventListener('mouseup',(e)=>{
    let tar=document.getElementById('mlogin');
    let tar1=document.getElementById('msignin');
    if(!tar.contains(e.target) && !tar1.contains(e.target))
    {
        document.getElementById('mlogin').style.display='none';
        document.getElementById('msignin').style.display='none';
    }
})
document.addEventListener('mouseup',(e)=>{
    let mess=document.getElementById('message-box');
    let mess1=document.getElementById('message-box1');
    if(!mess.contains(e.target) && !mess1.contains(e.target))
    {
        document.getElementById('message-box').style.display='none';
        document.getElementById('message-box1').style.display='none';
    }
})
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}