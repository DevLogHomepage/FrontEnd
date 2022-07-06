export interface RequestInit{
    mode: string
    cache: string
}

/**
 * 
 */
export interface PostTile{
    name: string,
    path: string
}

/**
 * 깃버브에서 폴더 정도를 가지고 올 때 사용하는 형식 파일입니다.
 */
export interface FolderResponse {
  type: string;
  size: number;
  name: string;
  path: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
}

/**
 * 깃허브에서 파일 `content`를 가지고 올 때 사용하는 형식 파일입니다.
 */
export interface FileContentsResponse {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
}

export interface RequestRepo{
    
}
export interface VueStatus<T>{
    dep: Set<any>,
    __v_isRef: boolean,
    __v_isShallow:boolean,
    _rawValue: T,
    _value: T,
    value: T

}

/** contribution 관리 타입 */

export interface ContributionCalendar{
    months: ContributionMonths[],
    totalContributions: number,
    weeks: ContributionDays[],
    __typename:string
}

export interface ContributionMonths{
    firstDay: string,
    name: string,
    totalWeeks: number,
    year:number,
    __typename:string
}

export interface ContributionWeeks{
    contributionDays: ContributionDays[],
    __typename:string
}

export interface ContributionDays{
    color:string,
    contributionCount: number,
    contributionLevel: string,
    date: string,
    weekday: number,
    __typeName:string
}

/**  */
export interface CommitResponse{
    data:{
        repository:{
            commitsData:{},
            content:{
                entries: ContentNode[]
            }
        }
    }
}



export interface Node{
    node:{
        committedDate:string 
        oid:string
        author:{  
          email:string
        }
    }
}

export interface ContentNode{
    name:string,
    object:{
        entries:[]
    }
    type:string
}


export interface ContentFile{
    name:string,
    object:{
        byteSize: number;
        text:string
    },
    type:string
}

export interface CommitDatas{
    edges: Node[]
}

/**
 * 깃허브 블로그 글을 작성할때의 기본적인 정보를 입력하는 데이터 타입입니다.
 */
export interface BlogPostData{
    name:string,
    content:string,
    createdat:string,
    updatedat:string,
    titleData:TitleData
    
}

/**
 *  깃허브에서 글을 가지고 와서 특정 `prefix` ,`surfix`를 지정해서 `title`과 `tags` 받아옵니다.
 */
export interface TitleData{
    title:string,
    tags:string[],
}