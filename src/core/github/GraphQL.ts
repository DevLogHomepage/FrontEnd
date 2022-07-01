import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export function getTesting(){
    const QUERY = gql`
    query RepoFiles($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            object(expression: "HEAD:") {
            # Top-level.
            ... on Tree {
                    entries {
                    name
                    type
                    object {
                        ... on Blob {
                            byteSize
                        }
                        # One level down.
                        ... on Tree {
                            entries {
                                name
                                type
                                object {
                                    ... on Blob {
                                        byteSize
                                    }
                                }
                            }
                        }
                    }
                    }
                }
            }
        }
    }
        `;
    const { result,loading } = useQuery(QUERY, {
        owner: "dennis0324",
        name:'blogPost'
    });

    return { result,loading }
}