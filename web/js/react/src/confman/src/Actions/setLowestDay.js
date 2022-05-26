const setLowestDay = (sessions) => {
    sessions.sort((a, b) => {
        const { Day__c: day1 } = a;
        const { Day__c: day2 } = b;
        return day1 - day2;
    });
    const lowestNumber = sessions[0].Day__c;
    return {
        type: "SET_LOWEST_DAY",
        payload: lowestNumber,
    };
};

export default setLowestDay;
