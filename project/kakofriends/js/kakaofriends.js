$(function(){
    //kakaofriends =================================================================
    var kakaofriends=[
        {
            name:['라이언', 'RYAN'],
            icon:'icon-kakaofriends-ryan',
            content:['갈기가 없는 것이 콤플렉스인 수사자',
            `큰 덩치와 무뚝뚝한 표정으로 오해를 많이 사지만, 
            사실 누구보다도 여리고 섬세한 소녀감성을 지닌 반전 매력의 소유자! 
            원래 아프리카 둥둥섬 왕위 계승자였으나, 자유로운 삶을 동경해 탈출! 
            카카오프렌즈의 든든한 조언자 역할을 맡고 있습니다.`
            ],
            color:'#39516d',            
            mode:''
        },
        {
            name:['어피치', 'APEACH'],
            icon:'icon-kakaofriends-apeach',
            content:['복숭아 나무에서 탈출한 악동 복숭아',
            `유전자 변이로 자웅동주가 된 것을 알고 
            복숭아 나무에서 탈출한 악동 복숭아 어피치! 
            섹시한 뒷태로 사람들을 매혹시키며, 
            성격이 매우 급하고 과격합니다.`
            ],
            color:'#fec6c8',
            mode:'dark'
        },
        {
            name:['프로도', 'FRODO'],
            icon:'icon-kakaofriends-frodo',
            content:['부자집 도시개 프로도',
            `순수하고 어리숙해 보이지만 Friends City의 자산가인 도시 개 프로도. 
            물려받은 재산 덕분에 항상 부유한 삶을 보내지만 순수 혈통이 아니라는 컴플렉스를 가지고 있습니다.
              네오와 카카오프렌즈 공식 커플로 알콩달콩 깨볶는 중!`
            ],
            color:'#a98342',
            mode:'dark'
        },
        {
            name:['네오', 'NEO'],
            icon:'icon-kakaofriends-neo',
            content:['쇼핑을 좋아하는 패셔니스타',
            `자기 자신을 가장 사랑하는 새침한 고양이 네오. 쇼핑을 좋아하는 
            이 구역의 대표 패셔니스타입니다. 하지만 도도한 자신감의 근원이 
            단발머리 ‘가발’에서 나온다는 건 비밀!
            항상 주변을 맴도는 프로도를 귀찮아 하면서도 귀여워합니다.`
            ],
            color:'#f18887',
            mode:'dark'
        },
        {
            name:['무지', 'MUZI'],
            icon:'icon-kakaofriends-muzi',
            content:['토끼옷을 입은 단무지',
            `호기심 많은 장난꾸러기 무지의 정체는 사실 토끼 옷을 입은 단무지! 
            토끼 옷을 벗으면 부끄러움을 많이 탑니다. 
            라이언에게 밀리고 있지만 카카오톡을 상징하는 노란색을 가진 실질적인 주인공이라고 할 수 있지요.`
            ],
            color:'#ffd200',
            mode:'dark'
        },
        {
            name:['콘', 'CON'],
            icon:'icon-kakaofriends-con',
            content:['나이를 알 수 없는신비로운 꼬마악어',
            `혼자만의 외로운 연구에 지쳐가던 어느 날, 
            콘은 평생의 동반자로 지낼 친구를 만들기로 결심하고 마침내 무지를 탄생! 
            무지는 바깥세상에 대한 호기심을 참지 못하고 늘 탈출을 시도하고 콘은 항상 무지 주변을 맴돌며 관찰합니다.`
            ],
            color:'#36724f',
            mode:''
        },
        {
            name:['튜브', 'TUBE'],
            icon:'icon-kakaofriends-tube',
            content:['겁 많고 마음 약한 오리',
            `겁 많고 마음 약한 오리 튜브는 극도의 공포를 느끼면 미친 오리로 
            변신합니다. 작은 발이 콤플렉스이기 때문에 큰 오리발을 착용합니다. 
            미운 오리 새끼가 먼 친척입니다.`
            ],
            color:'#94ccd9',
            mode:'dark'
        },
        {
            name:['제이지', 'JAYG'],
            icon:'icon-kakaofriends-jayg',
            content:['힙합을 사랑하는 자유로운 영혼',
            `땅속 나라 고향에 대한 향수병이 있는 비밀요원 제이지! 
            사명의식이 투철하여 냉철해보이고 싶으나, 실은 어리버리합니다. 
            겉모습과 달리 알고보면 외로움을 많이 타는 여린 감수성의 소유자. 
            힙합 가수 Jay-Z의 열혈팬입니다.`
            ],
            color:'#626466',
            mode:''
        },
        {
            name:['니니즈', 'NINIZ'],
            icon:'icon-kakaofriends-niniz',
            content:['친숙하지만 미스터리한 친구들',
            `니니즈는 미지의 공간 '스노우타운'에 모여살아요.
            친숙하고 귀여운 외모와 달리,
            성격이나 행동은 그렇지 않답니다.
            미스터리 니니즈 친구들을 만나러 가볼까요?`
            ],
            color:'#4361aa',
            mode:''
        }
    ]

    kakaofriends.forEach(obj => {
        $('.kakaofriends .swiper-container .swiper-wrapper').append(`
            <li class="swiper-slide">
                <div class="top">
                <i class="icon ${obj.icon}"></i>
                <div class="text-box ${obj.mode}">
                    <strong>${obj.name[0]}<span>${obj.name[1]}</span></strong>
                    <a href="#">제품보기<i class="icon icon-arrow"></i></a>
                </div>
                </div>
                <div class="content">
                <strong>${obj.content[0]}</strong>
                <p>${obj.content[1]}</p>
                </div>
            </li>
        `)        
    });

    var kakaofriendsSwiper = new Swiper('.kakaofriends .swiper-container', {
        navigation: {
            nextEl: '.kakaofriends .icon-next',
            prevEl: '.kakaofriends .icon-prev',
        },
        effect: 'flip',
        flipEffect: {        
            slideShadows: false,
        },
        loop:true,
        pagination: {
            el: '.kakaofriends .swiper-pagination',
            type: 'progressbar',
        },
    });
    kakaofriendsSwiper.on('slideChange',function(){
        var index=kakaofriendsSwiper.realIndex;
        console.log(index);        
        $('.kakaofriends').css('background-color',kakaofriends[index].color);
    })

})