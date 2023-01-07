exports.Application_Command_Option_Type = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,	//Any integer between -2^53 and 2^53
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7, // Includes all channel types + categories
    ROLE: 8,
    MENTIONABLE: 9, // Includes users and roles
    NUMBER: 10, // Any double between -2^53 and 2^53
    ATTACHMENT: 11, // attachment object
}

exports.Message_Flags = {
    SUPPRESS_EMBEDS: 1 << 2,
    EPHEMERAL: 1 << 6
}
exports.Html_Method = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
}