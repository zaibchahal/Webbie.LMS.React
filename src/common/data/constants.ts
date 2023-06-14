//export const BASE_URL = 'https://localhost:44302';
export const BASE_URL = 'https://stupefied-proskuriakova.69-10-42-234.plesk.page';
export const API_BASE_URL = BASE_URL + '/api';

export const AUTH_URLS = {
    IsTenantAvailable: API_BASE_URL + '/services/app/Account/IsTenantAvailable',
    TokenAuth_Authenticate: '/TokenAuth/Authenticate',
    MakeCredentialOptions: API_BASE_URL + '/Fido/MakeCredentialOptions',
    MakeCredential: '/Fido/MakeCredential',

    AssertionOptionsPost: API_BASE_URL + '/Fido/AssertionOptionsPost',
    MakeAssertion: API_BASE_URL + '/Fido/MakeAssertion',
    AuthenticateFido: API_BASE_URL + '/TokenAuth/AuthenticateFido',
};


export const QBANK_URLS = {
    GetQuestionCount: '/services/app/QuestionBankService/GetQuestionCount',
    GetSystemQuestionCount: '/services/app/QuestionBankService/GetSystemQuestionCount',
    CreateTestResult: '/services/app/QuestionBankService/CreateTestResult',
    GetQuestionToSolve: '/services/app/QuestionBankService/GetQuestionToSolve',
    SaveResultDetail: '/services/app/QuestionBankService/SaveResultDetail',
    AddRemoveFavourites: '/services/app/QuestionBankService/AddRemoveFavourites',
    GetResults: '/services/app/QuestionBankService/GetResults',
    GetQuestionPapers: '/services/app/QuestionBankService/GetQuestionPapers',
    CreateTestResultByPaper: '/services/app/QuestionBankService/CreateTestResultByPaper',
    Completed: '/services/app/QuestionBankService/Completed',
};

export const PROFILE_URLS = {
    GetCurrentUserProfileForEdit: '/services/app/Profile/GetCurrentUserProfileForEdit',
    GetProfilePicture: '/services/app/Profile/GetProfilePicture',
    ChangePassword: '/services/app/Profile/ChangePassword',
    UpdateProfilePicture: '/services/app/Profile/UpdateProfilePicture',

    UploadProfilePicture: BASE_URL + '/Profile/UploadProfilePicture',
    DownloadTempFile: BASE_URL + '/File/DownloadTempFile', //fileToken fileName=ProfilePicture &fileType=image/jpeg &v=1683616970003
};

export const STUDENT_URLS = {
    GetFovouritsList: '/services/app/QuestionBankService/GetFovouritsList',
    GetLiveClassList: '/services/app/LiveSessionService/MyLiveSession',
    GetTicketList: '/services/app/TicketService/GetTicket',
    PostTicket: '/services/app/TicketService/CreatUpdateTicket',
    SupportCategotyDropdown: '/services/app/DropDownService/GetSupportCategory',
    SupportPriorityDropdown: '/services/app/DropDownService/GetTicketPriority',
    GetStudyPlannerList: '/services/app/TaskReminderService/GetTaskReminder',
    PostStudyPlanner: '/services/app/TaskReminderService/CreateTaskReminder',
    GetFaq: '/services/app/FaqsService/GetFaqs',
    GetKnowladgeBase: '/services/app/KnowledgeBaseService/GetKnowledgeBase',
    GetAllCoursesList: '/services/app/CourseService/GetAllCourseForStudent',
    GetMyCoursesList: '/services/app/EnrollmentService/MyCourses',
    GetSearchContent: '/services/app/SearchService/SearchContent',
    GetCourse: '/services/app/CourseService/GetCourseDetail',
    GetVideoDetails: '/services/app/WatchService/GetVideoPath',
    postIsWatched: '/services/app/WatchService/IsWatched',
};

export const AppConst = {
    TenantID: 'Abp.TenantId',
    TenantName: 'Abp.TenantName',
    CurrentUser: 'Abp.Current.User',
    CurrentSession: 'Abp.Current.Session',
    ProfilePic: 'Abp.Current.User.ProfilePic',
};

export const PaperMode = {
    Tutor: 'Tutor',
    Exam: 'Exam'
};
