from logging import Handler

class RequestDataHandler(Handler):
    def emit(self, record):
        if record.levelname == 'ERROR' and record.status_code == 400:
            # Access request information here using middleware or request object
            request = getattr(record, 'request', None)
            if request:
                # Log relevant request data
                self.log(f"Request URL: {request.path}")
                self.log(f"Request method: {request.method}")
                self.log(f"User agent: {request.META.get('HTTP_USER_AGENT')}")
                self.log(f"Request data: {request.POST if request.method == 'POST' else request.GET}")
                self.log(f"Error message: {record.msg}")
                # Call the parent class's emit method to log the message itself
                super().emit(record)
            else:
                # Log a message if request information is unavailable
                self.log("Request information not available.")
        else:
            # Log the message as usual if the error is not a 400
            # Make sure self.log exists
            if hasattr(self, 'log'):
                self.log(record)
            else:
                print(record)
            
