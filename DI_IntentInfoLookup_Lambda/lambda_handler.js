import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
const dynamodbClient = new DynamoDBClient();
export const handler = async (event) => {
    const intent = event.Details.Parameters.Intent;
    const language = event.Details.Parameters.DI_Language;
    const dynamodbTableName = process.env.TABLE_NAME;
    try {
        const params = {
            "TableName": dynamodbTableName,
            "KeyConditionExpression": "#intent = :intent AND #language = :language",
            "ExpressionAttributeNames": {
                "#intent": "Intent",
                "#language": "Language"
            },
            "ExpressionAttributeValues": {
                ":intent": { "S": intent },
                ":language": { "S": language }
            },
        };
        const command = new QueryCommand(params);
        const response = await dynamodbClient.send(command);
        if (response.Items && response.Items.length > 0) {
            const items = response.Items;
            const VM_Number = items[0].VM_Number.S;
            const DispositionCode = items[0].DispositionCode.S;
            return {
                "VM_Number": VM_Number,
                "DispositionCode": DispositionCode
            };
        } else {
            return {
                message: 'No items found for the given intent and language'
            };
        }
    } catch (error) {
        return {
            message: error.message
        };
    }
};