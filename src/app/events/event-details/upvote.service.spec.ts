import { UpVoteService } from "./upvote.service";
import { ISession } from 'src/app/shared';
import { of } from 'rxjs';

describe('voterService', () => {
    let voterService: UpVoteService, mockHttp

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])//mocking http calls in upvote service

        voterService = new UpVoteService(mockHttp)


    })

    describe('deleteVoter', () => {

        it('should remove voter from voters array', () => {
            let session = { id: 6, voters: ["joe", "steve", "jesse"] }
            mockHttp.delete.and.returnValue(of(false))
            voterService.deleteVoter(6, <ISession>session, 'steve')

            expect(session.voters.length).toBe(2)
        })

        it('should post to the right url', () => {
            let session = { id: 6, voters: ["joe", "steve", "jesse"] }
            mockHttp.delete.and.returnValue(of(false))
            voterService.deleteVoter(6, <ISession>session, 'steve')

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/6/sessions/6/voters/steve')
        })
    })

    // describe('addVoter', () => {
    //     it('should have been called with the right url', () => {
    //         let session = { id: 6, voters: ["joe", "steve", "jesse"] }
    //         mockHttp.post.and.returnValue(of(false))
    //         voterService.deleteVoter(6, <ISession>session, 'steve')

    //         expect(mockHttp.post).toHaveBeenCalledWith('/api/events/6/sessions/6/voters/steve', {}, jasmine.any(Object))
    //     })

    // })

})