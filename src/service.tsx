const API_URL='https://covlab-backend-production.up.railway.app/'
const data_cache = {};

export const getCasesTweetsGraphData = async () => {
    //daily
    let casesDaily:any = [];
    let tweetDaily:any = [];
    //weekly
    let casesWeekly:any = [];
    let tweetWeekly:any = [];
    let casesPer1kWeekly:any =[];
    //bi-weekly
    let casesBiWeekly:any = [];
    let tweetBiWeekly:any = [];
    //Cumulative
    let casesCumulative:any = [];
    let tweetCumulative:any = [];

    //tweet positivity
    let tweetPositivity: any = [];

    let dailyNewCasesDataset:any = {
        type:'spline',
        label: 'Daily New Cases',
        datasetID:'dailyNewCases',
        data:[]
    }
    
    let dailyNewTweetsDataset:any = {
    type:'spline',
    label: 'Daily New Tweets',
    datasetID:'dailyNewTweets',
    data:[]
    }
    let weeklyNewTweetsDataset:any = {
    type:'spline',
    label: 'Weekly New Tweets',
    datasetID:'weeklyNewTweets',
    data:[]
    }
    let weeklyNewCasesDataset:any = {
    type:'spline',
    label: 'Weekly New Cases',
    datasetID:'weeklyNewCases',
    data:[]
    }
    let biWeeklyNewTweetsDataset:any = {
    type:'spline',
    label: 'Bi-Weekly New Tweets',
    datasetID:'biWeeklyNewTweets',
    data:[]
    }
    let biWeeklyNewCasesDataset:any = {
    type:'spline',
    label: 'Bi-Weekly New Cases',
    datasetID:'biWeeklyNewCases',
    data:[]
    }
    let cumulativeTweetsDataset:any = {
    type:'spline',
    label: 'Cumulative New Tweets',
    datasetID:'cumulativeNewTweets',
    data:[]
    }
    let cumulativeCasesDataset:any = {
    type:'spline',
    label: 'Cumulative New Cases',
    datasetID:'cumulativeNewCases',
    data:[]
    }
    let tweetPositivityRatioDataset:any = {
    type:'spline',
    label: 'Tweet Positivty Ratio',
    datasetID:'tweetPositivity',
    data:[]
    }
    let usTableData:any = {
    cases_7_day_average:0,
    weekly_new_cases_per1k:0,
    new_tweets_count:0,
    positivity:0
    }
    const res = await fetch(API_URL + "graphData");
    const response = await res.json();
    
    const length = response[0].length < response[1].length ? response[0].length : response[1].length;
    //we need largest length, as we want to show both lines no matter if data is unavailable (assumption)

    for(var i =0;i<length-1;i++){
        //daily
        casesDaily.push([response[0][i].date,response[0][i].new_cases])
        tweetDaily.push([response[1][i].date,response[1][i].new_tweets])
        casesPer1kWeekly.push([response[1][i].date,response[1][i].weekly_new_cases_per10m])
        //weekly
        casesWeekly.push([response[0][i].date,response[0][i].cases_7_average])
        tweetWeekly.push([response[1][i].date,response[1][i].tweets_7_average])
        //biweeklu
        casesBiWeekly.push([response[0][i].date,response[0][i].cases_14_average])
        tweetBiWeekly.push([response[1][i].date,response[1][i].tweets_14_average])
        //cumulative
        casesCumulative.push([response[0][i].date,response[0][i].total_cases])
        tweetCumulative.push([response[1][i].date,response[1][i].total_tweets])
        //tweet positivty ratio
        tweetPositivity.push([response[1][i].date,response[1][i].positive_tweets_ratio])
    }

    //daily data
    dailyNewCasesDataset.data = casesDaily;
    dailyNewTweetsDataset.data = tweetDaily;
    //weekly data

    weeklyNewCasesDataset.data = casesWeekly;
    weeklyNewTweetsDataset.data = tweetWeekly;
    //bi weekly data

    biWeeklyNewCasesDataset.data = casesBiWeekly;
    biWeeklyNewTweetsDataset.data = tweetBiWeekly;

    //cumulative data
    cumulativeCasesDataset.data = casesCumulative
    cumulativeTweetsDataset.data = tweetCumulative;

    //tweet positivity ratio
    tweetPositivityRatioDataset.data = tweetPositivity;

    usTableData.cases_7_day_average = casesWeekly[casesWeekly.length-1];
    usTableData.new_tweets_count = tweetBiWeekly[tweetBiWeekly.length-1];
    usTableData.positivity = tweetPositivity[tweetPositivity.length-1];
    usTableData.weekly_new_cases_per1k = casesPer1kWeekly[casesPer1kWeekly.length-1];

    let returnVal = {
        "daily": [dailyNewCasesDataset,dailyNewTweetsDataset], 
        "cumulative":[cumulativeCasesDataset,cumulativeTweetsDataset],
        "14_day_avg":[biWeeklyNewCasesDataset,biWeeklyNewTweetsDataset],
        "7_day_avg":[weeklyNewCasesDataset,weeklyNewTweetsDataset]
    };

    return returnVal

}

export const getTweetLineData = async () => {
    let new_tweets_count_dataset = {
        type:'spline',
        label: 'New Tweets Count',
        datasetID:'New Tweets Count',
        data:[]
    }
    
    let total_tweets_count_dataset = {
        type:'spline',
        label: 'Total Tweet Count',
        datasetID:'weeklyNewCases',
        data:[]
    }
    
    let tweets_14_average_dataset = {
        type:'spline',
        label: 'Bi-Weekly New Cases',
        datasetID:'biWeeklyNewCases',
        data:[]
    }
    
    let tweets_7_average_dataset = {
        type:'spline',
        label: 'Cumulative New Cases',
        datasetID:'cumulativeNewCases',
        data:[]
    }
    //daily
    let new_tweets_count:any = [];
    //weekly
    let total_tweets_count:any = [];
    let tweets_14_average:any =[];
    //bi-weekly
    let tweets_7_average:any = [];
    //Cumulative

    let data = await fetch('https://covlab-backend-production.up.railway.app/graphData1');

    let response = await data.json();
    
    for(var i =0;i<response.length-1;i++){
        //daily
        new_tweets_count.push([response[i].date,response[i].new_tweets_count])
        total_tweets_count.push([response[i].date,response[i].total_tweets_count])
        //weekly
        tweets_14_average.push([response[i].date,response[i].tweets_14_average])
        //biweeklu
        tweets_7_average.push([response[i].date,response[i].tweets_7_average])
    }

    new_tweets_count_dataset.data = new_tweets_count;
    total_tweets_count_dataset.data = total_tweets_count;
    tweets_14_average_dataset.data = tweets_14_average;
    tweets_7_average_dataset.data = tweets_7_average;


    let returnVal = {
        "new_tweets_count": [new_tweets_count_dataset], 
        "total_tweets_count": [total_tweets_count_dataset],
        "14_day_avg":[tweets_14_average_dataset],
        "7_day_avg":[tweets_7_average_dataset]
    };

    return returnVal;
}