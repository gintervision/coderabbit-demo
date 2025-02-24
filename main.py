def add(a,b):
    return a + b

def lambda_handler(event, _):
    print(event)
    add(event['a'], event['b'])
    return {
        'statusCode': 200,
        'body': 'Hello from Lambda!'
    }
