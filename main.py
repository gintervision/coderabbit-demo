import logging

logger = logging.getLogger()

def plus(a, b):
    return a + b

def lambda_handler(event, _):
    print(event)
    response = plus(event['a'], event['b'])
    return {
        'statusCode': 200,
        'body': str(response)
    }
