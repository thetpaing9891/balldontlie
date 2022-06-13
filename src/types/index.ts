export type Player = {
    id: number;
    first_name : string
    height_feet? : string
    height_inches? : string
    last_name : string
    position : string
    team  : Team,
    weight_pounds? : string
}

export type Team = {
    id : number
    abbreviation : string
    city : string
    conference : string
    division : string
    full_name : string
    name : string
}

export type requestParams = {
    per_page : number,
    page : number,
    search? : string,
}

export type AuthResponse = {
    data: {
        token: string
        name: string
    }
}

export type TeamType = {
    id : string
    name : string
    player_count : number
    region : string
    country : string
}