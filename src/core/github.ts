import { BlogPostDataMonth, BlogPostDataYear, BlogStreamData } from '@/Type' 

import { BlogPostData } from '@/Type'


/**
 * 특정 범위에 있는 블로그 포스트를 찾기 위한 함수입니다.
 * 
 * @param fromDate 찾고자하는 블로그 포스트의 시작 범위
 * @param toDate 찾고자하는 블로그 포스트의 끝 범위
 * @param blogPostDatas 전체 블로그 포스트의 업데이트 날짜 배열
 */
export function getBetweenDate(fromDate:Date,toDate:Date,blogPostDatas:BlogPostData[]){
    const filteredPostDatas:BlogPostData[] = []
    for(const node of blogPostDatas){
        if(node.updatedat.localeCompare(toDate.toISOString()) !== 1){
            return filteredPostDatas
        }
        if(fromDate.toISOString().localeCompare(node.updatedat) !== 1){
            return filteredPostDatas
        }
        /** 스택이 아닌 큐로 사용하기 위함 */
        filteredPostDatas.splice(0,0,node)
        
    }
    return filteredPostDatas
}


/**
 * 받아온 2달의 데이터에서 1주일치로 나누어 주며 `map`형식으로 반환합니다.
 * 
 * @param blogPostDatas 깃허브에서 받아온 전체 블로그 글입니다.
 * @param page 현재 블로그가 표시하고 있는 페이지 위치입니다.
 * @returns 각 년,월로 분류 된 배열로 출력합니다.
 */
export function returnBlogMap(blogPostDatas:BlogPostData[]) {
    const TODAY = new Date(Date.now())
    const pastDay = new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate() - 6).getDay()
    const returnValue:BlogStreamData[] =  []

    for(const blogPostData of blogPostDatas){

        const weekday = new Date(blogPostData.updatedat)

        const subtract = (8 + (weekday.getDay() - pastDay)) % 8
        // const add = (8 + (currentDay - weekday.getDay())) & 8

        
        const startDate = new Date(weekday);
        startDate.setDate(weekday.getDate() - subtract);

        const index = checkWeekExist(returnValue,startDate);
        if(index === -1){
            const splitDate = startDate.toISOString().split('T')
            const temp:BlogStreamData = {
                month:`${splitDate[0]}`,
                backdate:`${splitDate[1]}`,
                blogPosts:[]
            } as BlogStreamData
            returnValue.push(temp)
            returnValue[returnValue.length - 1].blogPosts.push(blogPostData)
        }
        else{
            returnValue[index].blogPosts.push(blogPostData)
        }
        
    }

    return returnValue
}



/**
 * 현재 `map`에 특정 날짜가 있는지 확인합니다.
 * 
 * @param checkMap 포함된 날짜 시작지점과 `BlogPostData`를 포함한 `map`입니다.
 * @param date 찾고자 하는 날짜를 입력합니다.
 * @returns 있는지 없는지 확인하고 배열을 반환합니다.
 */
export function checkWeekExist(blogStreamData:BlogStreamData[],date:Date){
    return blogStreamData.findIndex((item,i) => {
        if(item.month === date.toISOString().split('T')[0]){
            return i;
        }
    })
}


/**
 * 좌측 인디케이터에 사용할 github 데이터를 변환합니다.
 * 
 * @param blogPostDatas 날짜와 그에 관련된 블로그 포스트 데이터가 있는 map를 매개변수로 받습니다.
 * @returns `BlogPostDataYear` 반환합니다.
 */
export function displayIndicator(blogPostDatas:Map<string,BlogPostData[]>){
    const blogPostDataYears:BlogPostDataYear[] = []
    const TODAY = new Date();
    for(const node of blogPostDatas.values()){
        for(const blogPostData of node){
            const postedDate = new Date(blogPostData.updatedat)
            const year = postedDate.getFullYear();
            const tempBlogPostDataYear:BlogPostDataYear = {
                year:year,
                data:[...Array(12)].map((_,index) => { return {month:index,data:[] as BlogPostData[]} as BlogPostDataMonth})
            } as BlogPostDataYear

            if(!isYearExist(blogPostDataYears,blogPostData)){
                blogPostDataYears.push(tempBlogPostDataYear)
            }

            const blogPostDataMonths =  blogPostDataYears[TODAY.getFullYear() - year].data
            blogPostDataMonths[postedDate.getMonth()].data.push(blogPostData)
        }
    }

    return blogPostDataYears
}

/**
 * 특정 년도가 존재하는지에 대한 검사 함수입니다.
 * 
 * @param blogPostDataYears 
 * @param blogPostData 
 * @returns boolean값으로 반환합니다.
 */
 export function isYearExist(blogPostDataYears:BlogPostDataYear[],blogPostData:BlogPostData){
    const result = blogPostDataYears.filter(element => element.year === parseInt(blogPostData.updatedat))
    return result.length >= 1
}