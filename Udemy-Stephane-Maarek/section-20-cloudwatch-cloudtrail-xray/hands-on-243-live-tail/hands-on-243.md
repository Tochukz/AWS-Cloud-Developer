# Lesson 243: CloudWatch Logs - Live Tail - Hands On
### Description
CloudWatch Live Tail gives us the ability to monitor logs as they are ingested in real time.  
This can be very useful for debugging.  

__Tailing a LogGroup - AWS CLI__  
To tail a LogGroup, we can use the AWS CLI
```bash
# Syntax: aws logs tail <log-group-name> --follow
$  aws logs tail /aws/lambda/MyApp --follow
```

__Tailing a LogGroup - CloudWatch Console__  
We can also tail a Log Group using the CloudWatch Console.
1. Go to CloudWatch Console > Logs > Live Tail
2. Under the Filter drop down, search for the LogGroup you want to trail
3. Click that start button.  

__Pricing__  
CloudWatch Trail may be free for about 1 hours a day.  
Always close you CloudWatch Trail when not in use to avoid charges.  
