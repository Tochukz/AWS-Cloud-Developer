import json
import logging

# Configure logging to send logs to CloudWatch
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    """
    AWS Lambda function to process SQS messages.
    Logs each message body to CloudWatch.
    """
    try:
        # Check if 'Records' exist in the event
        if "Records" in event:
            for record in event["Records"]:
                body = record.get("body", "No body found")
                
                # Log the message body
                logger.info(f"Received message: {body}")

        else:
            logger.warning("No records found in the event.")

    except Exception as e:
        logger.error(f"Error processing SQS message: {str(e)}")

    return {"statusCode": 200, "body": "Messages processed"}
