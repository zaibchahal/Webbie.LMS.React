//export const API_BASE_URL = 'https://localhost:44302/api';
export const BASE_URL = 'https://stupefied-proskuriakova.69-10-42-234.plesk.page';
export const API_BASE_URL = BASE_URL + '/api';

export const Auth_Urls = {
	IsTenantAvailable: API_BASE_URL + '/services/app/Account/IsTenantAvailable',
	TokenAuth_Authenticate: API_BASE_URL + '/TokenAuth/Authenticate',
};

export const Profile_Urls = {
	GetCurrentUserProfileForEdit:
		API_BASE_URL + '/services/app/Profile/GetCurrentUserProfileForEdit',
	GetProfilePicture: API_BASE_URL + '/services/app/Profile/GetProfilePicture',
	ChangePassword: API_BASE_URL + '/services/app/Profile/ChangePassword',
	UpdateProfilePicture: API_BASE_URL + '/services/app/Profile/UpdateProfilePicture',

	UploadProfilePicture: BASE_URL + '/Profile/UploadProfilePicture',
	DownloadTempFile: BASE_URL + '/File/DownloadTempFile', //fileToken fileName=ProfilePicture &fileType=image/jpeg &v=1683616970003
};

export const Student_Urls = {
	GetFovouritsList: API_BASE_URL + '/services/app/QuestionBankService/GetFovouritsList',
	GetLiveClassList: API_BASE_URL + '/services/app/LiveSessionService/MyLiveSession',
	GetTicketList: API_BASE_URL + '/services/app/TicketService/GetTicket',
	PostTicket: API_BASE_URL + '/services/app/TicketService/CreatUpdateTicket',
	SupportCategotyDropdown: API_BASE_URL + '/services/app/DropDownService/GetSupportCategory',
	SupportPriorityDropdown: API_BASE_URL + '/services/app/DropDownService/GetTicketPriority',
	GetStudyPlannerList: API_BASE_URL + '/services/app/TaskReminderService/GetTaskReminder',
	PostStudyPlanner: API_BASE_URL + '/services/app/TaskReminderService/CreateTaskReminder',
	GetFaq: API_BASE_URL + '/services/app/FaqsService/GetFaqs',
	GetKnowladgeBase: API_BASE_URL + '/services/app/KnowledgeBaseService/GetKnowledgeBase',
	GetAllCoursesList: API_BASE_URL + '/services/app/CourseService/GetAllCourseForStudent',
	GetMyCoursesList: API_BASE_URL + '/services/app/EnrollmentService/MyCourses',
};

export const AppConst = {
	TenantID: 'Abp.TenantId',
	TenantName: 'Abp.TenantName',
	CurrentUser: 'Abp.Current.User',
	CurrentSession: 'Abp.Current.Session',
	ProfilePic: 'Abp.Current.User.ProfilePic',
};
