export interface ISection {
	data: ISectionBody[];
}

export interface ISectionBody {
	attributes: {
		Page: string;
		howItWorks?: IHowItWorks;
		welcome?: IWelcome;
		subscribe?: any;
		whoWeAre?: any;
	};
}

export interface IHowItWorks {
	id: number;
	title: string;
	steps: IStep[];
}

export interface IStep {
	backgroundColor: string;
	description: string;
	icon: string;
	id: number;
	subTitle: string;
	title: string;
}

export interface IWelcome {
	id: number;
	title: string;
	description: string;
	steps: any[];
}
