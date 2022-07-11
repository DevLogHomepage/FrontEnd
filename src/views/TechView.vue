<!-- 
    여기서 해야할 일은 일단 GITHUB에서 가져오는 방식을 바꿔야한다 COMMIT만 가지고 오고 나머지는 천천히 가지고 오는걸로

 -->
<template>
    <main>
        <div id="tech" class="tech" :class="[theme ? 'dark' : 'light']">
            <div class="tech-container">
                <div class="left-sidebar">
                    <PageLocater />
                </div>
                <div class="posts" @scroll="handleScroll">
                    <div v-if="response!.length <= 0">
                        로딩중입니다.
                    </div>
                    <div class="blogPost">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor bibendum. Fusce nec orci nibh. Mauris dolor nibh, pulvinar vel tempor eleifend, malesuada sed ipsum. Maecenas feugiat libero in luctus laoreet. In maximus nisi dictum eleifend euismod. Donec non porttitor arcu, nec cursus tellus. Ut mi enim, vestibulum at metus in, sodales dignissim tellus. Vivamus accumsan at nisi in tincidunt. Nulla sed varius lacus. Phasellus vitae metus et elit hendrerit mattis id mattis velit. Integer ut pretium erat.

Mauris molestie odio sed elit auctor venenatis. Vivamus luctus ipsum nec risus dictum, ut viverra ante consectetur. Nullam placerat ac metus in feugiat. Praesent elementum nisi at sem tincidunt, vitae faucibus massa blandit. Phasellus feugiat nec nisl vel ultricies. Aliquam consectetur lacus ac arcu scelerisque aliquam. Proin facilisis finibus lacus in ultrices.

In mollis gravida metus at lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vehicula congue ex sed eleifend. Nunc sed orci eu est condimentum pulvinar. Nam malesuada laoreet tellus, sit amet lobortis diam iaculis sed. Proin maximus arcu nec tincidunt imperdiet. Integer imperdiet enim non ipsum interdum, id maximus ex posuere. Ut non risus quis purus scelerisque scelerisque. Quisque auctor euismod felis a fringilla.

Proin at nisi non orci mattis elementum. Cras eleifend ex ut nibh interdum, a lacinia magna pulvinar. Vestibulum luctus leo sed auctor mollis. Mauris molestie diam luctus enim semper iaculis. Quisque eu nulla a nibh lacinia suscipit ut ut lacus. Donec eget mattis leo. Praesent id felis mi. Morbi at consectetur libero. Praesent sed augue a odio fringilla dapibus id ac urna. Aenean condimentum turpis vitae nisl hendrerit venenatis. Donec faucibus ex id ligula faucibus imperdiet. Nulla commodo egestas elit sit amet vulputate. Pellentesque volutpat imperdiet dolor fringilla sodales. Sed consequat dolor eget est consequat, vel consectetur lorem lobortis. Pellentesque vel odio quam.

Cras vitae porta libero, vel maximus risus. Donec aliquam, leo ut rutrum dignissim, erat eros tincidunt urna, sit amet facilisis nisi diam in quam. Cras imperdiet interdum ante. Suspendisse ut orci arcu. Etiam id diam vel arcu condimentum commodo nec at leo. Mauris pharetra lorem ac rhoncus volutpat. Ut vestibulum urna libero, at euismod lectus sodales sed. Aliquam vel enim euismod orci venenatis ullamcorper. Sed hendrerit, nisl nec lobortis fringilla, lacus ante mattis neque, vitae dictum felis elit vitae ipsum. Sed vitae quam sit amet nisi dapibus porttitor. Etiam finibus facilisis imperdiet. Morbi bibendum tincidunt rutrum. Aenean laoreet ipsum eget dolor rhoncus iaculis.
                    </div>
                    <div >
                        <button></button>
                        {{page + 1}}
                        <button></button>
                    </div>
                    <!-- <div v-else v-for="node in response" :key="node.name" class="blogPost">
                        <div class="blogPost-container">
                            <div class="blogPost-create">
                                <div class="blogPost-create-title">제작한 날짜</div>
                                <div class="blogPost-create-content">{{node.createdat}}</div>
                            </div>
                            <div class="blogPost-update">
                                <div class="blogPost-create-title">업데이트 날짜</div>
                                <div class="blogPost-create-content">{{node.updatedat}}</div>
                            </div>
                        </div>
                        <div class="blogPost-title">{{node.titleData.title}}</div>
                        <div v-html="node.content"></div>
                        <div>{{node.titleData.tags}}</div>
                    </div> -->
                </div>

            </div>

        </div>
    </main>
    <footer>
        <div id="footer">
            <LogoDiv />
        </div>
    </footer>

</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { BlogPostData } from '@/utils/Types';
import PageLocater from '@/components/PageLocator.vue'
import * as grapqhl from '@core-graphQL/github'
import * as rest from '@core-rest/github'
import LogoDiv from '@/components/LogoDiv.vue';

/**
 * TechView의 정의 부분입니다.
 */
export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: 'TechView',
    /** 컴포넌트 시작 설정 부분입니다. */
    setup(){
        const response = ref<BlogPostData[]>([]);
        return {
            response
        }
        // const date = new Date();
        // let currentMonth = new Date(date.getFullYear(),date.getMonth(),1);
        // let nextMonth = new Date(date.getFullYear(),date.getMonth() + 1,1);
        // let difference  = nextMonth.getTime() - currentMonth.getTime();
        // const dayCount = Math.ceil(difference / (1000 * 3600 * 24));
    },
    /** 컴포넌트 기본 정의 부분 */
    components:{
        PageLocater,
        LogoDiv
    },
    /** 기본 properity의 정의 */
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,
        }
    },
    methods:{
        handleScroll(event:Event){
            this.yPosition = (event.target as HTMLElement).scrollTop
            if((event.target as HTMLElement).scrollTop <= 0){
                console.log()
            }
        }
    },
    data(){
        const blogPost = ref<Element>();
        const yPosition = ref<number>();
        const BlogPostData = ref<BlogPostData[]>([]);
        const page = ref<number>(0);
        return {
            blogPost,
            yPosition,
            BlogPostData,
            page
        }
    },
    /** 컴포넌트 생성시에 실행되는 함수입니다. */
    async mounted() {
        const path ="tech"
        this.response = await grapqhl.getPostUpdate({owner:'dennis0324',repo:'blogPost',path:path},'tech');
        
        console.log("test",this.response)
        for(const i of this.response){
            const temp = await rest.getContent({owner:'dennis0324',repo:'blogPost',path:`${path}/${i.name}.md`})
            
            console.log("testing",rest.decodeBase64UTF8(temp.content))
            //TODO 이거 함수 따로 하나 만들어서 제작하기
            this.BlogPostData.push()
        }

        
    },
    unmounted(){
        window.removeEventListener('scroll', this.handleScroll);
    }
});



</script>


<style scoped>
    /** 좌측 바를 담당하는 css입니다. */
    .left-sidebar{
        display:flex;
        flex-direction: column;
    }
    /** 다크 모드의 tech 관련 페이지 글씨 관련 css입니다. */
    .dark .tech{
        color:#fff;
    }

    /** 블로그 포스트 기본 정보 관련 css */
    .blogPost-container{
        display: flex;
    }
    
    /** 블로그 포스트 제목 관련 css */
    .blogPost-title{
        font-size: 40px;
    }
    /** 블로그 포스트 업데이트 날짜 관련 css입니다. */
    .blogPost-update{
        margin:10px;
    }
    /** 블로그 포스트 생성 날짜 관련 css입니다. */
    .blogPost-create{
        margin:10px;
    }
    /** 다크모드에서의 `블로그 생성 날짜` 글씨 관련 css입니다. */
    .dark .blogPost-create-title{
        color:#479CDC;
    }
    /** 다크모드에서의 `블로그 생성 날짜 숫자` 관련 css입니다. */
    .dark .blogPost-create-content{
        color:#fff;
        font-size: 25px;
    }
    /** 라이트모드에서의 `블로그 생성 날짜` 글씨 관련 css입니다. */
    .light .blogPost-create-title{
        color:#878787;
        font-size: 15px;
    }
    /** 라이트모드에서의 `블로그 생성 날짜 숫자` 관련 css입니다. */
    .light .blogPost-create-content{
        color:#000000;
        font-size: 25px;
    }

    /* 스크롤바 설정*/
    .posts::-webkit-scrollbar{
        width: 6px;
    }

    /* 스크롤바 막대 설정*/
    .posts::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: rgba(255,255,255,1);
        /* 스크롤바 둥글게 설정    */
        border-radius: 10px;    
    }

    /* 스크롤바 뒷 배경 설정*/
    .posts::-webkit-scrollbar-track{
        background-color: rgba(0,0,0,0);
    }


    /** tech view 페이지 조정 */

    #tech{
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 0 50px;
    }

    /** 블로그 사진 크기 조정 */
    .posts:deep(img){
        width:45vw;
    }

    /** 블로그 개시글 관련 css */
    .blogPost{
        margin:50px 0;
        padding: 70px 0;
        border-bottom: solid 1px #707070;
    }


    /** 테크 내용이 들어갈 컨테이너입니다. */
    .tech-container{
        display:flex;
    }

    /** 블로그 포스팅 */
    .posts{
        height:80vh;
        width:50vw;
        overflow-y: scroll;
        padding: 10px;
        
    }
    /** 블로그 코드 블럭 css */
    .blogPost:deep(pre code) {
        text-align: left !important;
        border-radius: 5px;
        background-color: transparent;
    }
    /** 블로그 코드 블럭 */
    .blogPost:deep(pre){
        text-align: left !important;
        border-radius: 5px;
        padding: 10px;
        background-clip: border-box;
    }
    /** 라이트 모드에서의 블로그 포스트 코드 블럭 관련 css입니다. */
    .light .blogPost:deep(pre){
        background-color: #878787;

    }
    /** 다크 모드에서의 블로그포스트 코드 블럭 관련 css입니다. */
    .dark .blogPost:deep(pre){
        background-color: #222222;
    }
    /** footer관련 css입니다. */
    #footer{
        width:100%;
        height:100%;
        display:flex;
        align-items: center;
    }
    /** 로고 관련 div에 관련된 css입니다. */
    #LogoDiv{
        margin-left:2vw;

    }
</style>