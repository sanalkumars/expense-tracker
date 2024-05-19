const userTypeDef = `#graphql

type User {
    _id : ID!
    username : String!
    name : String!
    password : String!
    profilePicture : String
    gender : String!

}

type Query{
    users : [User!]
    authUser : User
    user(userId:ID!) : User
}

type Mutation{
    signUp(input: SignUpInput!): User
    loginIn(input: LoginInInput!): User
    logOut: LogoutResponse
}

type SignUpInput{
    username : String!
    name : String!
    password : String!
    gender : String!
}

type LoginInInput{
    username : String!
    password : String!
}

type LogoutResponse{
    message : String!
}


`

export default userTypeDef ;