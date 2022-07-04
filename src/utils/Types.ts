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