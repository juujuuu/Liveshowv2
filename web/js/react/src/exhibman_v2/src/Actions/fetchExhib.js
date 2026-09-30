import createAPI from "../Utils/api";
import test from "../Actions/test"
/**
 * Async action creator for fetching an exhibitor
 * @param {String} site - Url of site to use as an endpoint.
 * @param {String} id - SF exhibitor id.
 */
const fetchExhib = (site, id, expos) => async dispatch => {

    const api = createAPI(site);
    let call,geObj
    if(expos==="'chinaExhibitorList'"){
      
       geObj= await api.get(test); 
       
       var {data}=geObj
       let {exhibitors}=data
       data=exhibitors
   
 data.map(el=>{
        
el['id']=el['exhibitorId'];
el['content']=el['companyDescriptionEn'];
el['logo']=el['companyLogo'];
el['country']=el['countryEn'];
el['exhibitor-cat']=el['productGroupIndexEn'];
el['pagetitle']=el['companyNameEn'];
el['Expo__c']="chinaExhibitorList"
el['web_logo']=el['logo'];
el['logo']=el['logo'];


el['url']=el['webSite'];
el['Company_Address__c']=el['companyAddress'];
el['exhibitor-booth']=el['boothNo'];
el['Company_City__c']=el['city'];
el['Company_Zip__c']=el['province'];
el['Exhibitor_Assets__r']=el['products'];
if(el['Exhibitor_Assets__r'].length>0){
   el['Exhibitor_listing_type__c']="Enanched"// to
}else{
   el['Exhibitor_listing_type__c']="Standard"// to
}

const videoLink=el["publicVideo"]
const GetFirstVideo=el['Exhibitor_Assets__r']['Link__c']
console.log(el['Exhibitor_Assets__r'][0])
const firstVideo=el['Exhibitor_Assets__r'][0]

delete el['exhibitorId'];
delete el['companyDescriptionEn'];
delete el['companyLogo'];
delete el['countryEn'];
delete el['productGroupIndexEn'];
delete el['companyNameEn'];
delete el['companyAddress'];
delete el['webSite'];
delete el['boothNo'];
delete el['city'];
delete el['province'];
delete el['products'];

el['Exhibitor_Assets__r'].map(el=>{

  
   el['Link__c']=videoLink;


})


})

   data= data.filter(el=> el.id == id)
if(data[0]['Exhibitor_Assets__r'].length>0){


const linkVideo=data[0]['Exhibitor_Assets__r'][0]['Link__c']
if(linkVideo!==""){
   data[0]['Exhibitor_Assets__r'][0]['Asset_Type__c']="Video"
}
}

   //  console.log(data,"data")
    const data2=[...data]
    
const test=   {
    "nameCn": "PS发泡片材挤出机",
    "img1": "https://oss.expotec.com.cn/project/foam/exhibitor/upload/img/pc_024179fa-8230-c5c4-81ff-ba562c26f63d.jpg",
    "img2": "https://oss.expotec.com.cn/project/foam/exhibitor/upload/img/pc_e696e4b4-236c-8196-5983-f2d7092ea790.jpg",
    "img3": "https://oss.expotec.com.cn/project/foam/exhibitor/upload/img/pc_0c85aea0-06b1-3966-a677-0384763822d5.jpg",
    "img4": "https://oss.expotec.com.cn/project/foam/exhibitor/upload/img/pc_3952e157-3b87-c7fe-d432-fe5833cd336c.jpg",
    "img5": "https://oss.expotec.com.cn/project/foam/exhibitor/upload/img/pc_1c574e0d-0b51-42ba-290f-f425a5a4798f.jpg",
    "Link__c": "https://oss.expotec.com.cn/project/foam/exhibitor/upload/video/pc_780d56c8-5392-3973-0b3f-d9bfc04b4ca0.mp4",
    "Asset_Type__c": "Video"
}


    dispatch({ type: "FETCH_EXHIB", payload: data[0]  });
     
    }else{

    let { data } = await api.get(`/rest/exhib_drilldown.php?booth='${id}'`);
     
    dispatch({ type: "FETCH_EXHIB", payload: data[0] });
   
}};

export default fetchExhib;
