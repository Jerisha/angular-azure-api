export class Custom {

    static compareStartAndEndTelNo(startTelNo: any, endTelNo: any): string {
        let errMsg = '';
        //Enter start telephone no
        if (endTelNo != '' && startTelNo == '')
            errMsg = 'Please enter the Start Telephone No';
        //Telephonerange
        if ((endTelNo != '' && startTelNo != '') && (endTelNo - startTelNo) > 10000)
            errMsg = 'TelephoneRange must be less than or equal to 10000';
        //startTelNo should be < endTelNo
        if ((endTelNo != '' && startTelNo != '') && (startTelNo > endTelNo))
            errMsg = 'Start Telephone No should be less than End Telephone No';

        return errMsg

    }
}