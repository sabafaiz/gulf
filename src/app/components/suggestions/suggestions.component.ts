import { Component } from '@angular/core';
import { ComplaintsService } from '../../providers/complaints.service';

declare let $: any;
@Component({
    selector: 'suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: ['../complaints/complaints.component.css'],
    providers: [ComplaintsService]
})

export class SuggestionsComponent {
    public more: boolean = true;
    public isStudent: boolean = true;
    public selectedSuggestion: any = {};
    private pgNo: number = 1;
    public reason: any = '';
    public rca: any = '';
    public isOpen: boolean = false;
    public toclose: boolean = false;
    public toreopen: boolean = false;
    public toedit: boolean = false;
    public message: string = '';
    private index;
    public FacultyList: any[];
    public StatusList: any[];
    public PriorityList: any[];
    public status: boolean = false;
    public faculty: number;
    public priority: string = '';
    public comments: any[] = [];
    public comment: string = '';

    constructor(private cs: ComplaintsService) {
        console.log("sugg compo");
        this.cs.setServiceType('suggestion');
        this.getSuggestions();
        if (localStorage.getItem('loginType') == 'student') {
            this.isStudent = true;
        }
        else {
            this.isStudent = false;
        }
    }

    public suggestions: any[] = [];

    getSuggestions() {
        this.cs.getComplaints(this.pgNo).subscribe((res: any) => {
            if (res.length < 12) {
                this.more = false;
            }
            this.suggestions = this.suggestions.concat(res);
        }, (err: any) => {

        })
    }

    moreSuggestions() {
        this.pgNo++;
        this.getSuggestions();
    }

    openSuggestion(Suggestion: any, index: number) {
        this.isOpen = false;
        this.index = index;
        this.toclose = false;
        this.reason = '';
        this.rca = '';
        this.selectedSuggestion = Suggestion;
        console.log(this.selectedSuggestion);
        if (!this.isStudent) {
            this.cs.getComplaintById(Suggestion.id).subscribe((res: any) => {
                this.selectedSuggestion = res;
                $('#showSuggestion').modal('show');
                console.log(res);
            }, (err: any) => {

            })
        }
        else {
            $('#showSuggestion').modal('show');
        }
    }

    closeSuggestion() {
        if (this.isStudent) {
            this.cs.closeComplaint(this.selectedSuggestion.id, this.reason).subscribe((res: any) => {
                this.message = "Suggestion Closed Successfully";
                this.suggestions[this.index] = res;
                $('#showSuggestion').modal('hide');
                $('#success').modal('show');
            }, (err: any) => {
                this.message = err.developerMessage;
                $('#showSuggestion').modal('hide');
                $('#success').modal('show');
            })
        }
        else {
            this.cs.closeComplaint(this.selectedSuggestion.id, this.reason, this.rca).subscribe((res: any) => {
                this.message = "Suggestion Closed Successfully";
                this.suggestions[this.index] = res;
                $('#showSuggestion').modal('hide');
                $('#success').modal('show');
            }, (err: any) => {
                this.message = err.developerMessage;
                $('#showSuggestion').modal('hide');
                $('#success').modal('show');
            })
        }
    }

    reOpenSuggestion() {
        this.cs.reOpenComplaint(this.selectedSuggestion.id, this.reason).subscribe((res: any) => {
            this.message = "Suggestion ReOpend Successfully";
            this.suggestions[this.index] = res;
            $('#showSuggestion').modal('hide');
            $('#success').modal('show');
        }, (err: any) => {
            this.message = err.developerMessage;
            $('#showSuggestion').modal('hide');
            $('#success').modal('show');
        })
    }

    satisfySuggestion() {
        this.cs.satisfyComplaint(this.selectedSuggestion.id).subscribe((res: any) => {
            this.message = "Success";
            this.suggestions[this.index] = res;
            $('#showSuggestion').modal('hide');
            $('#success').modal('show');
        }, (err: any) => {
            $('#showSuggestion').modal('hide');
            $('#success').modal('show');
        })
    }

    getDetails() {
        this.toedit = true;
        this.cs.getFacultyList().subscribe((res: any) => {
            this.FacultyList = res;
        }, (err: any) => {

        });
        this.cs.getStatusList().subscribe((res: any) => {
            this.StatusList = res;
        }, (err: any) => {

        })
        this.cs.getPriorityList().subscribe((res: any) => {
            this.PriorityList = res;
            console.log(this.PriorityList);
        }, (err: any) => {

        })
    }

    editSuggestion() {

        let obj = {}
        if (this.priority) {
            obj['priority'] = this.priority;
        }
        if (this.status) {
            obj['statusId'] = 3;
        }
        if (this.faculty) {
            obj['assignedTo'] = this.faculty;
        }
        this.cs.editComplaint(this.selectedSuggestion.id, obj).subscribe((res: any) => {
            this.suggestions[this.index] = res;
            this.message = "Edit Successfully";
            $('#showSuggestion').modal('hide');
            $('#success').modal('show');
        }, (err: any) => {
            this.message = err.developerMessage;
            $('#showSuggestion').modal('hide');
            $('#success').modal('show');
        })
    }

    openComments() {
        this.isOpen = true;
        $('#showSuggestion').modal('hide');
        this.cs.getComments(this.selectedSuggestion.id).subscribe((res: any) => {
            console.log(res);
            this.comments = res;
        }, (err: any) => {
        })
        this.sockJsConnection();
    }

    sockJsConnection() {
        let stompClient = this.cs.getSockJs();
        var type: string;
        if (this.isStudent) {
            type = 'st';
        }
        else {
            type = 'ma';
        }
        console.log("12222");
        console.log(this.suggestions);
        let url = `/${type}/suggestion/${this.selectedSuggestion.id}/comment`;
        let url1 = `/${type}/suggestion/${this.selectedSuggestion.id}/close`;
        let that = this;
        stompClient.connect({}, (frame: any) => {
            console.log("12222");
            console.log(this.suggestions);
            stompClient.subscribe(url, (greeting: any) => {
                let message = JSON.parse(greeting.body);
                if (!message) {
                    return;
                }
                if (!this.comments) {
                    this.comments = [];
                }
                this.comments.push(message);
            });
            stompClient.subscribe(url1, (complaint: any) => {
                let comp = JSON.parse(complaint.body);
                this.selectedSuggestion = comp;
                console.log(this.suggestions);
                this.suggestions[this.index] = this.selectedSuggestion;
            })
        });
    }

    sendComment() {
        let comment = {
            comment: this.comment
        }
        if (this.comment != '') {
            this.cs.postComment(this.selectedSuggestion.id, comment).subscribe((res: any) => {
                this.comments.push(res);
                this.comment = '';
            }, (err: any) => {

            })
        }
    }
}