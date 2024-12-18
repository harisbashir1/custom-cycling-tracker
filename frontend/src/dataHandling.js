  import sax from 'sax';

  export const handleButtonClick = () => {
      console.log('Button clicked!');
    };
  
  export function parseHealthData(XMLfile, uploadProgress) {
    return new Promise((resolve, reject) => {
      const heartRateRecords = [];
      const cyclingWorkouts = []; 
      const reader = new FileReader();
      const chunkSize = 10000;
      let offset = 0;
      const fileSize = XMLfile.size;

      const parser = sax.parser(true);
      // Handle opening tags to extract heart rate records
      parser.onopentag = (node) => {
        if (
          node.name === 'Record' &&
          node.attributes.type === 'HKQuantityTypeIdentifierHeartRate'
        ) {
          const HRrecord = {
            recordType: 'HR',
            creationDate: node.attributes.creationDate,
            startDate: node.attributes.startDate,
            endDate: node.attributes.endDate,
            value: parseFloat(node.attributes.value)
          };
          heartRateRecords.push(HRrecord);
        }

          if (
            node.name === 'Workout' &&
            node.attributes.workoutActivityType === 'HKWorkoutActivityTypeCycling'
          ) {
            const cyclingRecord = {
              recordType: 'indoorCycleWorkout',
              duration: node.attributes.duration,
              startDate: node.attributes.startDate,
              endDate: node.attributes.endDate,
              creationDate: node.attributes.creationDate
            };
            cyclingWorkouts.push(cyclingRecord);
        }
      };

      parser.onerror = (error) => {
        reject(error);
      };

      // Upon completion 
      parser.onend = () => {
        resolve({ heartRateRecords, cyclingWorkouts });
      };
  
      // Function to read the next chunk
      function readNextChunk() {
        if (offset < fileSize) {
          const chunk = XMLfile.slice(offset, offset + chunkSize);
          reader.readAsText(chunk);
        } else {
          parser.close();
        }
      }
  
        // Handle reader load event (after reading a chunk)
        reader.onload = (event) => {
        const chunkData = event.target.result;
        parser.write(chunkData); // Parse the chunk of data
        offset += chunkSize; // Move the offset forward
        if (uploadProgress) {
          uploadProgress(Math.min((offset / fileSize) * 100,100)); //math.min to ensure progress doesnt exceed 100
        }
        readNextChunk(); // Read the next chunk
      };
  
      // Handle reader errors
      reader.onerror = (error) => {
        reject(error);
      };

      // Start reading the first chunk
      readNextChunk();
    });
  }