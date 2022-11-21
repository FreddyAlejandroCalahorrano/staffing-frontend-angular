import {ProfilesService} from './profiles.service';
import {from} from "rxjs";
import {Profile} from "../types/profile";
import {PersonProfile} from "../types/personProfile";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

describe('ProfilesService', () => {
  let profilesService: ProfilesService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    profilesService = new ProfilesService(httpServiceMock);
  })

  it('should be created', () => {
    expect(profilesService).toBeTruthy();
  });

  it('should return expected profiles', (done: DoneCallback) => {

    const expectedProfiles: Profile[] = [
      {"id": 1, "nameProfile": "Dev Front"},
      {"id": 2, "nameProfile": "QA"},
      {"id": 3, "nameProfile": "Dev Back"},
      {"id": 4, "nameProfile": "Devops"},
      {"id": 5, "nameProfile": "Bancs"},
      {"id": 6, "nameProfile": "BI"}
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedProfiles]);

    from(profilesService.getProfiles())
      .subscribe((profiles) => {
        // expected value
        expect(profiles).toEqual(expectedProfiles)

        // chapters length is expected to be greater than 0
        expect(profiles.length).toBeGreaterThan(0)

        profiles.forEach((profile) => {
          // Name Profile is expected not to be null
          expect(profile.nameProfile).not.toBeNull()
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return expected profiles assigned to a person', (done: DoneCallback) => {

    const expectedPersonProfile: PersonProfile = {
      "personTo": {
        "id": 29,
        "ultimatix": null,
        "name": "Luis",
        "lastName": "Suarez",
        "email": "luis@suarez.com",
        "bornDay": null,
        "bornMonth": null,
        "bankEntryDate": "2022-05-17",
        "phoneNumber": "0979125152",
        "codeCountry": "AFG",
        "role": "Staff",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 3,
        "idSeniority": 2
      },
      "profileTos": [
        {"id": 1, "nameProfile": "Dev Front", "principal": "Si"},
        {"id": 2, "nameProfile": "QA", "principal": "No"}
      ],
      "user": "nicolasito"
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPersonProfile]);

    from(profilesService.getProfilesByPerson(expectedPersonProfile.id))
      .subscribe((personProfile) => {
        // expected value
        expect(personProfile).toEqual(expectedPersonProfile)

        // chapterToList Length is expected to be 2
        expect(personProfile.profileTos.length).toBe(2)

        // expected to have a main profile
        expect(personProfile.profileTos[0].principal).toEqual('Si')

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })


  it('should assign a profile list to a person', (done: DoneCallback) => {

    const newPersonProfile: PersonProfile = {
      "personTo": {
        "id": 1,
        "ultimatix": null,
        "name": "KEVIN BRYAN",
        "lastName": "SUAREZ GUZMAN",
        "email": "ksuarezg@pichincha.com",
        "bornDay": 0,
        "bornMonth": 0,
        "bankEntryDate": null,
        "phoneNumber": "0986735012",
        "codeCountry": "ECU",
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 2,
        "idSeniority": 4
      },
      "profileTos": [
        {"id": 2, "nameProfile": "QA", "principal": "Si"},
        {"id": 3, "nameProfile": "Dev Back", "principal": "No"},
        {"id": 4, "nameProfile": "Devops", "principal": "No"},
        {"id": 5, "nameProfile": "Bancs", "principal": "No"}],
      "user": "nicolasito"
    }

    httpServiceMock.post.mockReturnValueOnce([newPersonProfile]);

    from(profilesService.addPersonProfile(newPersonProfile))
      .subscribe((personProfile) => {
        // expected value
        expect(personProfile).toEqual(newPersonProfile)

        // chapterToList Length is expected to be 4
        expect(personProfile.profileTos.length).toBe(4)

        // expected to have a main profile
        expect(personProfile.profileTos[0].principal).toEqual('Si')


        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })


});
