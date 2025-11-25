import gql from '../../lib/gql.js'

export default gql`
  type Query {
    getQuery(input: GetQueryInput): GetQueryPayload!
  }

  type GetQueryPayload {
    data: JSON!
  }

  input GetQueryInput {
    model: String!
    operation: String!
    params: JSON
  }
`
