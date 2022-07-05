import { GITHUB_TOKEN } from '@/../config'
import { FolderResponse,PostTile } from '@/Type' 

export function githubRequest(relativeUrl: string) {
    const init = {} as RequestInit
    init.mode = 'cors';
    init.cache = 'no-cache'; // force conditional request
    const request = new Request('https://api.github.com/' + relativeUrl,{method: "GET" ,cache:'no-cache',mode:'cors'});
    request.headers.set('Accept', 'application/vnd.github.v3+json');
    request.headers.set('Authorization', `token ${GITHUB_TOKEN}`);
    return request;
}

export function githubFetch(request: Request): Promise<Response> {
    return fetch(request).then(response => {
        if (response.status === 401) {
            console.log()
        }
        if (response.status === 403) {
            response.json().then(data => {
                if (data.message === 'Resource not accessible by integration') {
                    window.dispatchEvent(new CustomEvent('not-installed'));
        }
    });
    }

    if (request.method === 'GET'
            && [401, 403].indexOf(response.status) !== -1
            && request.headers.has('Authorization')
        ) {
        request.headers.delete('Authorization');
            return githubFetch(request);
        }
        return response;
    });
}

export function decodeBase64UTF8(encoded: string) {
    encoded = encoded.replace(/\s/g, '');
    return decodeURIComponent(atob(encoded));
}

/**
 * 현재 깃허브에 올라가있는 블로그를 불러옵니다.
 * 
 * @param content `owner`,`repo`,`path`으로 구성된 dictonary 입니다.
 * @returns `{name,path}`으로 구성된 dictionary를 반환합니다.
 */
export async function getPostName(content:{owner:string,repo:string,path:string}){
    const branch = 'main'
    const request = githubRequest(`repos/${content.owner}/${content.repo}/contents/${content.path}?ref=main`)
    const response = await githubFetch(request)

    if (response.status === 404) {
        throw new Error(`Repo "${content.owner}/${content.repo}" does not have a file named "${content.path}" in the "${branch}" branch.`);
        }
        if (!response.ok) {
        throw new Error(`Error fetching ${content.path}.`);
        }
        const file = await response.json() as FolderResponse[] | string
        const arr:FolderResponse[] = file as FolderResponse[]
        const PostTile:PostTile[] = []
        for(const i of arr){
            const temp = {
                name: i.name,
                path: i.path
            }
            PostTile.push(temp)
        }
    return PostTile
}

