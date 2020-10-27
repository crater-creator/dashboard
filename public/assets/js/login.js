
$(document).ready(function(){  
    
    var width = window.outerWidth;
        if (width <= 450) {
            $('#sidebar').attr('class','');
        }else if(width>=450){
            $('#sidebar').attr('class','active');
        }
    });

function pagereload(id){
    $("#bodycontents").load(`./assets/js/side_menu/${id}.html`);
    var width = window.outerWidth;
    if (width <= 450) {
        var sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('active')) sidebar.classList.remove('active');
    }
}

function logout(){
    location.href='/'
}

function register1(){
    location.href='register'
}

function register(){
    
    var name = document.getElementsByClassName('form-control')[0].value
    var ID = document.getElementsByClassName('form-control')[1].value
    var pw = document.getElementsByClassName('form-control')[2].value
    var pw1 = document.getElementsByClassName('form-control')[3].value
    

    const data = { reg_user: ID, reg_pw: pw, name: name };

    fetch('http://webapi.rhymeduck.com/a/v1/backoffice/join', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    if(data.result.ret === 'success'){
        location.href='/'
        alert('회원가입에 성공하였습니다.')
    }else if(pw !== pw1){
        location.href='register'
        alert('비밀번호가 다릅니다.')
    }else{
        location.href='register'
        alert('회원가입에 실패하였습니다.')
    }
    });
}

function enter_test(){
    if(window.event.keyCode ==13){
        chk.click()
    }
}

function enter_test1(){
    if(window.event.keyCode ==13){
        chk1.click()
    }
}

function enter_test2(){
    if(window.event.keyCode ==13){
        stora2.click()
    }
}

var count1 =''
function TTStableCreate(){
    
    var storeName1 = document.getElementById('stora').value;
    if (storeName1 === ''){
        return alert("매장명을 입력해주세요")
    }else{
        const data = { word: storeName1 };
        
        
        fetch('http://webapi.rhymeduck.com/a/v1/soundfier/search', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
       
        var html ='';
        var len1 = data.data.member_list;
        var len = len1.length-1;
        var count1 = range(0,len);
        
        for(key in count1){
            html += '<tr><th scope="row">'+data.data.member_list[key].member_name+'</th>';
            html += '<td >'+data.data.member_list[key].member_info+'</td>';
            html += `<td><div class="text-center"><input  id="lbs2" onclick="reset_pwdCount('${data.data.member_list[key].member_info}')" class="btn btn-primary" type="button" value="초기화"></div></td>`;
            html += `<td>
            <div class="modal fade" id="modalLoginForm`+ key +`" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">Password change</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-lock prefix grey-text"></i><br>
                  </div>
                  <div style="margin-top:-60px" class="md-form mb-4">
                    <i class="fas fa-lock prefix grey-text"></i>
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Password</label>
                    <form>
                        <input type="password"  id="PwId`+`${key}" name="defaultForm-pass" class="form-control validate">
                        <label data-error="wrong" data-success="right" for="defaultForm-pass">Password confirm</label>
                        <input onkeypress="if(window.event.keyCode ==13){chPw`+`${key}.click()}" type="password" id="PwId_confirm`+`${key}" name="defaultForm-pass" class="form-control validate">
                    </form>
                    </div>
          
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button id="chPw`+`${key}" onclick="reset_pwd3('${data.data.member_list[key].member_info}','PwId`+`${key}','PwId_confirm`+`${key}')" class="btn btn-outline-primary btn-rounded waves-effect">change</button>
                </div>
              </div>
            </div>
          </div>
          <div style="width=5%">
          <div  class="text-center">
            <a href=""  id="lbs3" class="btn btn-primary" role="button" data-toggle="modal" data-target="#modalLoginForm`+key+`">변경</a>
          </div>
          </div>`
          ;html += '</tr>';
        }
        $("#dynamicTbody").empty();
        $("#dynamicTbody").append(html);
        })
    } 
};

function member_tableCreate(){
    
    var storeName1 = document.getElementById('stora').value;
    if (storeName1 === ''){
        return alert("검색어를 입력해주세요")
    }else{
        const data = { word: storeName1 };
        
        
        fetch('http://webapi.rhymeduck.com/a/v1/member/search', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        if (data.result.ret ==='failure'){
            alert('검색결과가 없습니다.')
        }else{
        var html ='';
        var len = data.data.member_list.length-1;
        var count1 = range(0,len);
        for(key in count1){
            var width = window.outerWidth;
            var meminfo = data.data.member_list[key].member_info;
            var memname = data.data.member_list[key].name;
            var memid = data.data.member_list[key].id;
            var memver = data.data.member_list[key].version;
            var memrecentLog = data.data.member_list[key].recentlogin;
            var memid1 = data.data.member_list[key].member_id;
            var memsrc = data.data.member_list[key].music_src;
            var memContr = data.data.member_list[key].contract_state;
            html += '<tr><th id="mid2" scope="row">'+memid1+'</th>';
            if (width <= 450) {
                $('#member_name3').css('display','none');
                $('#name3').text('업체명/매장명');
                if(meminfo.substr(12)==='')
                    html += '<td >'+memname+'<br>'+meminfo+'</td>';
                else{
                    html += '<td >'+memname+'<br>'+meminfo.substr(0,10)+'<br>'+meminfo.substr(10,20)+'<br>'+meminfo.substr(20)+'</td>';
                }
            }else if(width>=450){
                html += '<td >'+memname+'</td>';
                html += '<td >'+meminfo+'</td>';
            }

            html += '<td >'+memid+'</td>';
            html += '<td id="version2">'+memver+'</td>';
            if(memrecentLog === null){
                html += '<td id="recentLog2">'+''+'</td>';
            }else{
                html += '<td id="recentLog2">'+moment(memrecentLog).format("YYYY-MM-DD HH:mm:ss")+'</td>';
            }
            html += '<td id="src2" >'+memsrc+'</td>';
            html += `<td id="mobile_hdsr"><div class="text-center"><input  id="lbs2" onclick="reset_hardSerial('${memid1}')" class="btn btn-primary" type="button" value="초기화"></div></td>`;
            html += `<td id="mobile_hdsr1">
            <div class="modal fade" id="modalLoginForm`+ key +`" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">Password change</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-lock prefix grey-text"></i><br>
                  </div>
                  <div style="margin-top:-60px" class="md-form mb-4">
                    <i class="fas fa-lock prefix grey-text"></i>
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Password</label>
                    <input type="password"  id="PwId`+`${key}" name="defaultForm-pass" class="form-control validate">
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Password confirm</label>
                    <input onkeypress="if(window.event.keyCode ==13){chPw`+`${key}.click()}" type="password" id="PwId_confirm`+`${key}" name="defaultForm-pass" class="form-control validate">
                  </div>
          
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button id="chPw`+`${key}" onclick="reset_pwd2('${memid1}','PwId`+`${key}','PwId_confirm`+`${key}')" class="btn btn-outline-primary btn-rounded waves-effect">change</button>
                </div>
              </div>
            </div>
            </div>
            <div style="width=5%">
            <div  class="text-center">
                <a href=""  id="lbs3" class="btn btn-primary" role="button" data-toggle="modal" data-target="#modalLoginForm`+key+`">변경</a>
            </div>
            </div></td>`;
            if(memrecentLog === null){
                memrecentLog =''
            }
            html += `<td >
            <div class="modal fade" id="exampleModalCenter${key}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">

            
            <div class="modal-dialog modal-dialog-centered" role="document">


                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">세부사항</h5>
                            
                        </div>
                        <div id="detail${key}" class="modal-body">
                            <div style="font-size:12pt">-MID: ${memid1}<br></div>
                            <div style="font-size:12pt">-업체명: ${meminfo}<br></div>
                            <div style="font-size:12pt">-매장명: ${memname}<br></div>
                            <div style="font-size:12pt">-아이디: ${memid}<br></div>
                            <div style="font-size:12pt">-버전: ${memver}<br></div>
                            <div style="font-size:12pt">-최근로그인: ${moment(memrecentLog).format("YYYY-MM-DD HH:mm:ss")}<br></div>
                            <div style="font-size:12pt">-신탁/비신탁: ${memsrc}<br></div>
                            <div style="font-size:12pt">-계약상태: ${ memContr} (1:계약중, 0:계약만료)</div>
                            <div id="hds1"style="font-size:12pt">-하드시리얼 초기화<button onclick="reset_hardSeria('${memid1}')"style=" font-size: 2px; width: 16vw; height:3vh; float:right; "  class="btn btn-primary btn-sm">Reset</button></div>
                            <div id="pwc1"style="font-size:12pt">-비밀번호 초기화:(초기값:12345)<button onclick="reset_pwd2('${memid1}')"style="font-size: 2px; width: 16vw; height:3vh; float:right;"  class="btn btn-primary btn-sm">Reset</button></div>
                            
                        </div>
                        <div id="detailBox" > 
                            <div class="modal-body">
                                <div class="modal-body mx-3" style="margin-top:-30px;"></div>
                            </div> 
                            </div>
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
            </div>
            <button type="button" id="lbs4" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter${key}">
            자세히
            </button>
            </td>`;

          ;html += '</tr>';
        }
        $("#dynamicTbody").empty();
        $("#dynamicTbody").append(html);
    } })
    } 
};


function range(start, end) {
 
    var arr = [];
 
    var length = end - start; 
 
    for (var i = 0; i <= length; i++) { 
 
        arr[i] = start;
        start++;
    }
 
    return arr;
}

function reset_pwdCount(count7){
    const data = { member_info: count7 };
    
    fetch('http://webapi.rhymeduck.com/a/v1/soundfier/initpw', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    if(data.result.ret === 'success'){
        alert("실패 회수가 초기화 되었습니다.")
    }else{
        alert("error입니다.")
    }
    
    });
}

function reset_pwd2(member_info, pwId,pwId_confirm){
    var member_Id = member_info
    var pwdId = pwId
    var pwdId_confirm = pwId_confirm
    var password = document.getElementById(pwdId).value
    var password1 = document.getElementById(pwdId_confirm).value
    console.log(member_Id)
    console.log(password, password1)

    if(password1 === '' || password===''){
        alert('비밀번호를 입력해주세요.')
    }else if(password !== password1){
        alert('비밀번호를 확인해주세요.')
    }else{
        const data = { member_info: member_Id, member_pw: password };

        fetch('http://webapi.rhymeduck.com/a/v1/member/changepw', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if ( data.result.ret === 'success'){
                location.href='main'
                alert('성공입니다.')
            }else{
                alert('다시 시도해주세요')
            }
        });
    }
}

function reset_pwd3(member_info, pwId,pwId_confirm){
    var member_Id = member_info
    var pwdId = pwId
    var pwdId_confirm = pwId_confirm
    var password = document.getElementById(pwdId).value
    var password1 = document.getElementById(pwdId_confirm).value

    if(password1 === '' || password===''){
        alert('비밀번호를 입력해주세요.')
    }else if(password !== password1){
        alert('비밀번호를 확인해주세요.')
    }else{
        const data = { member_info: member_Id, member_pw: password };

        fetch('http://webapi.rhymeduck.com/a/v1/soundfier/changepw', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if ( data.result.ret === 'success'){
                location.href='main'
                alert('성공입니다.')
            }else{
                alert('다시 시도해주세요')
            }
        });
    }
}

function reset_hardSerial(member){
    // console.log(member)
    const data = { member_id: member };
    
    fetch('http://webapi.rhymeduck.com/a/v1/member/inithdd', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
    if(data.result.ret === 'success'){
        alert("하드 시리얼이 초기화 되었습니다.")
    }else{
        alert("error입니다.")
    }
    
    });
}
// jQuery(function($){
// 	$("#foo-table").DataTable({
// 		"dom": 'iptfl'
// 	});
// });