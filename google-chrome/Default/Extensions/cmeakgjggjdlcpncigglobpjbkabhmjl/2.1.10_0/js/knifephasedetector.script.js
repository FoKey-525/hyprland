window.KnifePhaseDetector =
  window.KnifePhaseDetector ||
  (() => {
    const PHASE = {
      'phase 1': { name: 'Phase 1', code: 'phase1', num: 1, extraordinary: false },
      'phase 2': { name: 'Phase 2', code: 'phase2', num: 2, extraordinary: false },
      'phase 3': { name: 'Phase 3', code: 'phase3', num: 3, extraordinary: false },
      'phase 4': { name: 'Phase 4', code: 'phase4', num: 4, extraordinary: false },
      ruby: { name: 'Ruby', code: 'ruby', extraordinary: true, backgroundColor: '#ff1600' },
      sapphire: { name: 'Sapphire', code: 'sapphire', extraordinary: true, backgroundColor: '#3500fa' },
      'black pearl': { name: 'Black Pearl', code: 'blackpearl', extraordinary: true, backgroundColor: '#000000' },
      emerald: { name: 'Emerald', code: 'emerald', extraordinary: true, backgroundColor: '#00ff3e' },
    };
    const PHASE_CODES = {
      415: 'am_ruby_marbleized',
      416: 'am_sapphire_marbleized',
      417: 'am_blackpearl_marbleized',
      418: 'am_doppler_phase1',
      419: 'am_doppler_phase2',
      420: 'am_doppler_phase3',
      421: 'am_doppler_phase4',
      568: 'am_emerald_marbleized',
      569: 'am_gamma_doppler_phase1',
      570: 'am_gamma_doppler_phase2',
      571: 'am_gamma_doppler_phase3',
      572: 'am_gamma_doppler_phase4',
      617: 'am_blackpearl_marbleized_b',
      618: 'am_doppler_phase2_b',
      619: 'am_sapphire_marbleized_b',
      852: 'am_doppler_phase1_widow',
      853: 'am_doppler_phase2_widow',
      854: 'am_doppler_phase3_widow',
      855: 'am_doppler_phase4_widow',
    };
    const phases = {
      '★ Bayonet | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJF7dG7lb-PmOfkP77DqXtZ6dZ02dbN_Iv9nBrn8xBtNWH3I4aVI1M_Z1DY-VC3yO3qjJ68v8uYyCcxuHIr5SvdyhPin1gSOZJrt8Zc',
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJF7dG7lb-PmOfkP77DqXtZ6dZ03tbN_Iv9nBrgrhY9YWv3ddOQe1VrZlrSr1i3x7y8gp7tuMjKy3BnvHMm53iPzRzin1gSOeS3UoKk',
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJF7dG7lb-PmOfkP77DqXtZ6dZ029bN_Iv9nBrt8xc_Mm36LYbGJ1BqZVvT_AO9yee5h8Pv6ZnNzntquCl0syqIlhbmn1gSOX0EjU7D',
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJF7dG7lb-PmOfkP77DqXtZ6dZ02NbN_Iv9nBqxqUFuMm70cNTBJwVsYF-C-wK5x73v0ZK66Z6cyHYyvHNw7HncnhHmn1gSOe-FljRX',
          },
          {
            phase: 'Emerald',
            paint_index: 568,
            image: null,
          },
        ],
      },
      '★ Bowie Knife | Doppler': {
        phases: [
          {
            phase: 'Ruby',
            paint_index: 415,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbuhH5T8fp8i_vD-Yn8klGwlB81NDG3OoKcIFNtZwrY_FS8we7nhcK56M_KnSA3uSAr4y3blhe1gRlPOOE8g6eACQLJeZoaTC4',
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbuhWpB-M14mOz--I3nilixogk5NwavfdHNNhg4aF2GrFDqyOy7gpS8uJyanXVhuiEg4X6Imkbi0ksaauQ8h_yWSw3MGeUXSxvQ_hK5',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukmRB-Ml0mNbR_Y3mjQeLpxo7Oy3tJIDDIwM7N1_QrwC_kLy7jZS-u5TLznowvSQqsS3VnROz1UtLaedqgeveFwtWkcZrCw',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukmRB-Ml0mNbR_Y3mjQCLpxo7Oy3tI9CVdg5sN1nRqVLsyOfn1JK-uZ_LyydivScq4XncmxCwgRBMaONm1uveFwskVkI00Q',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukmRB-Ml0mNbR_Y3mjQWLpxo7Oy3tctKTJANraFqCr1O6x7jp0ZW77piYznBr6CVx5n-LnUOx1xBLaLA-1OveFwsUDaA3_A',
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukmRB-Ml0mNbR_Y3mjQaLpxo7Oy3tdtPGdAJvZl_U8lK-wei6jJe06pTLmyRrviIg5izZyka3gB0fO-M60OveFwtfLsbWJQ',
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
        ],
      },
      '★ Huntsman Knife | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQaLpxo7Oy3tdoCRe1M5ZlCCqFm6xr3n05G-tJ-azHJl7ikhtn_UlkOy101Kb-dp0eveFwtJkpLDkA',
          },
          {
            phase: 'Emerald',
            paint_index: 568,
            image: null,
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQWLpxo7Oy3tLITAIQdoNV_W-lS-w-y9jZ677ZvMzCdhu3QrtCrfyUG0gU5IarNqg-veFwvG9_V4eg',
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQCLpxo7Oy3td9SXcwI_aFvU_AC-k-nnhpS76prAwCFm7Ckm5n6LlxS_hkxEauBr1uveFwsjqBVrvA',
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQeLpxo7Oy3tJI_DJlBtYA2G_AS_we7nhZW76JrInXEx63Er7X7anxy_iE1NaO1v1-veFwvgKhee1A',
          },
        ],
      },
      '★ Bowie Knife | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukWpc5cROjubR5YDwmmukoxIvNmqceN_CKkIgNV3RrlG-lefojZS7upSYyCdn6XEh53uMy0bjgB9JP-ZnhKafTg7PBbsJQvdiR-BFtw',
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukWpc5cROjubR5YDwmmukoxIvNmiceN_CKkIgYl3VqVS7ye3ugsPquJXMzXY3siUqsyuLmkG11B9Labdv1_CeSw_MBrsJQvdYGLGjZA',
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukWpc5cROjubR5YDwmmukoxIvNmuceN_CKkIgNF2D_Vi8wua61p7qvc-bm3cw6yR2sHzbzR3jgUoeabE7g6GfHVyZUrsJQvd8UdmQxg',
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbukWpc5cROjubR5YDwmmukoxIvNm2ceN_CKkIgZwyB-lDqkrjmhcW7vJubzHU37iAm5X3ay0fh0B9LarM71_bNHw7ID7sJQve8Rk1QIg',
          },
          {
            phase: 'Emerald',
            paint_index: 568,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbuk2ZU-sR9jtbM9J73hFG9sRY4DDWqc97RbFRvZ1zYr1i2ye_rg5LutZ_JzHtlvnYmsHjYnhC2gk5MZ7E-06PMGlmAR_sedIpgjBc',
          },
        ],
      },
      '★ Flip Knife | Doppler': {
        phases: [
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOym5Cbm_LmDKvZl3hUufp9g-7J4cKti1Hm8xJkZ22lcNKSIwE6NQnUr1S7xLu5hZ676MiYnXtmuSBx537bgVXp1gHAfnds',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOym5Cbm_LmDKvZl3hUu_p9g-7J4cKkjAKy_UNvYmr3LICScw5qYVHX-FPsle7ohJO5v8_BzHFquiIqti7UgVXp1uXJwnIm',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOym5Cbm_LmDKvZl3hUvPp9g-7J4cLx3wPn_EtpYWHxcdfAJwE2M1uD81K2kuu9hZPt7ZzBmHA3vHMnt3aOgVXp1qpw3IfY',
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOym5Cbm_LmDKvZl3hUuvp9g-7J4cKt3VDgrRBvN2mmcIKRcwE4Ml7XrgW5weq6gJfuvZ_OwXJj6CYr43nbgVXp1lSP-ZpH',
          },
        ],
      },
      '★ Bayonet | Doppler': {
        phases: [
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUx1Rd4cJ5nqfHpo720QfmqkQ4ZmjyLYOQdQNqZV-E-Va_lbvujZ-7vZTMnXcxviAg-z-DyENGQTnj',
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUxFRd4cJ5nqfEoYqt3Vfkrko9Yj2nINfEJwRsaFzXrwK4wbzohpK678zBnSFjvSkm-z-DyO0Gjtp3',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUxVRd4cJ5nqfDo9-m0Azm-Upsaz31LYSUcAU5Y16Crlm6wujmgJK_vZ3JnSAx6yAh-z-DyLGLsdXe',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUwlRd4cJ5nqeXoI6s2wXkrxA_amihLdDAegJrZwuGqVK5l-m8jcfqtJTKzCdn7il0-z-DyHLzR2GO',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
        ],
      },
      '★ Flip Knife | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEpLP5gVO8v11uZWz3cILHJ1VqZ1qCrFK6x73r15e9786amCBlvXF34XqMzRS3gx1JcKUx0pXU_kv6',
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEp7P5gVO8v11qNW72cdeRcwE3YAzZ-QK_lO7qgcC4uJqcy3E3s3Uq4yrczEO_00tFcKUx0hSF2xj1',
          },
          {
            phase: 'Emerald',
            paint_index: 568,
            image: null,
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEobP5gVO8v105NT_6ddCUJw46ZwnX_VS_krzugsS96J2dyCFi7CR253aOyxW_iBpIcKUx0t91Ee8V',
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEprP5gVO8v11vYGqlddWWJA44aV6EqQC8yb3o0MO7u8vNzCcys3F35X7czhXhg0xFcKUx0rhbw5oR',
          },
        ],
      },
      '★ Butterfly Knife | Doppler': {
        phases: [
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image: null,
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image: null,
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 617,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 618,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 619,
            image: null,
          },
        ],
      },
      '★ Butterfly Knife | Gamma Doppler': {
        phases: [
          {
            phase: 'Emerald',
            paint_index: 568,
            image: null,
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image: null,
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image: null,
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image: null,
          },
        ],
      },
      'Glock-18 | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 4',
            paint_index: 1123,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73djxP4d2JkI-bh_vxIYTBnmpC7ZFOjeXO9ofKhF2zowdyMmjwJobAcFVoZlzU_AW2xOq9jcW6uZqaynZnvCN35XnbmhO3hB0ZZ_sv26IN1TX3DQ',
          },
          {
            phase: 'Emerald',
            paint_index: 1119,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73dDBH_t26kL-GluX2P77YjG5V18J9herKyoD8j1yg5RJsMGDzLNSddANoZ1jQ8lO4k7q5hJG86ZrAynsx63Mn5XmOmB2_hRlSLrs4qY6sP5g',
          },
          {
            phase: 'Phase 1',
            paint_index: 1120,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73djxP4d2JkI-bh_vxIYTBnmpC7ZROjeXO9ofKhF2zowdyMGz2I4OWIw82MlmEqFLoxe3sh5K57ZrIzyQwuyQh7HnVzES-0BpJOPsv26IkDApQcg',
          },
          {
            phase: 'Phase 3',
            paint_index: 1122,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73djxP4d2JkI-bh_vxIYTBnmpC7ZZOjeXO9ofKhF2zowdyZTqiINfAIAFsYlmE_VS3kufngZHvuZiYzHdh7yUn43vYzRW_iEtIPPsv26I355lLig',
          },
          {
            phase: 'Phase 2',
            paint_index: 1121,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73djxP4d2JkI-bh_vxIYTBnmpC7ZdOjeXO9ofKhF2zowdyZGj7JI_BIAU8Ml7R-Fe7l-_qgsPt75jMnXthvCki5XbVzRy2gB0dbfsv26IpNpM7Lw',
          },
        ],
      },
      '★ Shadow Daggers | Doppler': {
        phases: [
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOym5Cbm_LmDKvZl3hUu_p9g-7J4cKk3lLj8hZlNm37IY6RcAE8YluDqQS4kufqhZ_t6Z2fzyA26yYq43_VgVXp1ufqKN5g',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOym5Cbm_LmDKvZl3hUufp9g-7J4cKj0QLj-EppY2r1coWXJwI7ZQ3RrFK8l-_n05K47czIwSFlvHV2tyvYgVXp1hdB66Xv',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOym5Cbm_LmDKvZl3hUvPp9g-7J4cKhjFLsrxU5Njzxco-ddQU9YQ3T8we7l-fojZ-9upyYyHIy63Qk436JgVXp1iYM08I9',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOkgYKSqPr1Ibndk2JL7cFOhuDG_Zi70VDsqUVkZ2ilJdDBdwY9Y1_SqVW2k-e5gZe978mbm3M3viEjs3jVzAv330-JX_TBGg',
          },
          {
            phase: 'Black Pearl',
            paint_index: 617,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eO0mIGInOfxMqndqWZQ-sd9j-Db8IjKimu4ohQ0J3f3Io7BdQBqZwyC_AW-wOu-hsLv6M_KwXJr7CYj4HeImkG_ghodaOZnm7XAHsHBEHN0',
          },
          {
            phase: 'Phase 2',
            paint_index: 618,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOym5Cbm_LmDKvZl3hUuvpzteXI8oThxlbhrRVqYWr1IYbHdlA8NArY_AK4l-i90Z6578jAnSBrsiFx536LmBKpwUYbGQf8LDI',
          },
          {
            phase: 'Sapphire',
            paint_index: 619,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOllZCbn_7mNoTcl3lT5MB4kOzFyo7KhF2zowdyYjzyLNOSJwI5NQmG-gS_wu3shJe0vsvMmyBh7Cckt33cnxLmgRxLPfsv26KRgz41VA',
          },
        ],
      },
      '★ Shadow Daggers | Gamma Doppler': {
        phases: [
          {
            phase: 'Emerald',
            paint_index: 568,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOzmYWZlvvwDLbQhGld7cxrj-3--YXygED6-0VsYz-hJNKcIwM8aQ3XqFi7l7_ngpHquJ7LyyZl6SQg5iqInRK0hQYMMLJWkXxH2Q',
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEobP5gVO8v106NW_xI9SccwQ_ZlvZqFO5lLy5gZfovsmbmiY3vCQg5HrYmkS21ElMcKUx0gHtMdyp',
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEpLP5gVO8v11oYmH3J4DDdVA5aAyC-wftk-e6gMTovJrBzXVh73Ii4i2MlxK20EoZcKUx0slxPaQg',
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEprP5gVO8v10_NTj7I46XewFqYV6CrAXow7vr0JW-7ZydyyBhunUr7SuLy0PjgktIcKUx0gT5iDIk',
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOxlY2GlsjwPKvBmm5D19V5i_rEp7P5gVO8v11uZGyndY7Bc1NoNFiC-lC6xe3q0Me76JydzSZh63Eg5HvZzBW1iRpOcKUx0nAjM6f5',
          },
        ],
      },
      '★ Stiletto Knife | Doppler': {
        phases: [
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20k_jkI7fUhFRB4MRij73--YXygED6qkI5Mmz1IYfEdQBoZVnY-Vm9x-i5hZ60uZnBnCFk7nIj5Cranxbk0gYMMLKjhzEAbA',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20k_jkI7fUhFRB4MRij7j--YXygED6qEJqYzz1JIGVdw49MlCC_FG5kOrnh8W-6ZrJwXBk7yIgtirZlxTmgwYMMLJW9L8mgA',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20k_jkI7fUhFRB4MRij7r--YXygED6rRBlZmqlItCWcwU7NwrV81e8k7jo05O-78ufwXtiu3En53zcnEG2hgYMMLLKZPZ97A',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20k_jkI7fUhFRB4MRij7v--YXygED6_UM5Z2GlJNPAJ1U8ZVrU-APvkr26jMO5vZjKzHsy6Cdx5Szfm0blhQYMMLLplyYA1Q',
          },
        ],
      },
      '★ Talon Knife | Doppler': {
        phases: [
          {
            phase: 'Phase 1',
            paint_index: 852,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KmsjwPKvBmm5D19V5i_rEpLPigVC7vCwwOj6rYJjHcAFtN1mB_1TryevvjJTu7p6bwHJjunIhsH6PzRzlgE0YbrA9gaSaVxzAUM53KYio',
          },
          {
            phase: 'Phase 3',
            paint_index: 854,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KmsjwPKvBmm5D19V5i_rEprPigVC7vCwwOj6rYJiddFU_YgvX_ATvxem5gpe6vZ7IwSAxviUm53-JzByziExIOOBrh_yfVxzAUHD9Uz99',
          },
          {
            phase: 'Phase 2',
            paint_index: 853,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KmsjwPKvBmm5D19V5i_rEp7PigVC7vCwwOj6rYJiRdgc9MFqG-FG4xb_ng5S-vZ-fnXdls3Zxt3nVmhW0gRBIaLZpgPzPVxzAUIi1tips',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Phase 4',
            paint_index: 855,
            image: null,
          },
        ],
      },
      '★ Ursus Knife | Doppler': {
        phases: [
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597dGJkI-bh_vxIYTBnmpC7ZFOhuDG_Zi73gO1_Eo9ZmvzdYPHegJvaA2FqAe6xefu1JC5tJ6azXpjunFwtivazQv330-0kzNW9Q',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597dGJkI-bh_vxIYTBnmpC7ZROhuDG_Zi72gft_0NuYDr1JtWTc1RtYQyB8wW6xOa8g8S8v5SYznFh6SYmti2Ilgv3309NCgeFGg',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597dGJkI-bh_vxIYTBnmpC7ZZOhuDG_Zi7jQC1rxdsMmmmJILAcgY_M1-CqwW8lO7mjcW8vc-cmnNi7nMi4n3bmQv330994c3yWw',
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597dGJkI-bh_vxIYTBnmpC7ZdOhuDG_Zi7iwHs_UE5YTj1cYDDdABsZ1HT_gC-wuzr15Dv7sudzyNkvXYrsXuJyQv3309QEJKtww',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
        ],
      },
      '★ Gut Knife | Doppler': {
        phases: [
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP0966lYOAh_L1Ibfum2pD6sl0g_PE8bP5gVO8v104ZG30JtPBdgY9ZAuF8gC8x-y5gZ-8vszLmHZluHQj7S6PyhyzhEpMcKUx0tQ8Y66i',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09i5hJCHkuXLI7PQhW4F18l4jeHVu9j0iVDgqENoZjj3d9KScgU3NFvS_FO7wL2-jJ-66JXKnHM273Z3s3nD30vgrjyIOlc',
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09i5hJCHkuXLI7PQhW4D18l4jeHVu9vw3ALk-0ZpMmGhcoaQdQNqZFrRqFG3x--505XutMzNnydqviZ2sC3D30vgckJMWyk',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09i5hJCHkuXLI7PQhW4C18l4jeHVu9Wk0FWy-UdvNzj2J4DHIAQ2aV_YrwK5xey80JXo75WcmiMy7ikj7X7D30vgvYNy_YI',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09i5hJCHkuXLI7PQhW4A18l4jeHVu4_z2A23qBJsYm_wLISSdARtZ13TrFjsxe_mjZO778nJwCcwvnYrtHvD30vgE8aGa3g',
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP08-3hJCDnuXxDLbQhGld7cxrj-3--YXygED6_BY4YDj2LIfHdgRvZl-ErAPsyezqhZC-uM6bnydmuHIm7HzZzBXhgQYMMLIwNRIYSA',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP086jlpm0mvbmMbfUn3FU7Pp9g-7J4cL32AWy-kRtZjrxcYHHJlBqYFnR_Va4xervjJe-6MjLmCdjvnV35XvbgVXp1pNfnFsg',
          },
        ],
      },
      '★ Huntsman Knife | Doppler': {
        phases: [
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20k_jkI7fUhFRB4MRij7r--YXygED6_RVrZTz7coeQdwZqNFCC-QDvwL_mgZG76MnMzCc1uScl5XyIyhOyhQYMMLJzgnWvwQ',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20k_jkI7fUhFRB4MRij73--YXygED6rRU9ZTuiIIPAIw87MgrQ_1e8xebt0ZW_vZzPnyZnunYk43rfmUCy1AYMMLI7eQJXHA',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20k_jkI7fUhFRB4MRij7j--YXygED6qEY_Nmn1IdeWe1c8YQ7Y_FG6k-3vjMO9u8-dmHNkviYi43eOyRfm1AYMMLIO04I4YA',
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20k_jkI7fUhFRB4MRij7v--YXygED6rUdlNmzzJYWddVI-ZlDT-Fm6kufu15e5tM7OmyZks3En7C6PnxGz1QYMMLJbl9IpHg',
          },
        ],
      },
      '★ M9 Bayonet | Doppler': {
        phases: [
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEpLP5gVO8v11lZGqnIdOVew9sN1HUrgK6k-m8hZ676ZWYyidg6CUqtiqIl0TmghlPcKUx0rpPOX91',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEprP5gVO8v106MG6lddWQJ1Q2aVDY-1nsk-zvh8C87Z6bn3Zg6XYltn7YmUawgR1OcKUx0vnkFGDN',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEobP5gVO8v11qZGilItfGe1Q_YwmG8wC9wrrojJG9v53LwCM1vHF04nndzBTigE4ecKUx0lKv9IQ3',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image: null,
          },
        ],
      },
      '★ Karambit | Doppler': {
        phases: [
          {
            phase: 'Ruby',
            paint_index: 415,
            image: null,
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image: null,
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image: null,
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7r--YXygED68kNqZmCmJIPBdgY3aVHYqVi9wezsgcO_vc7KnCM1syNz5n7UzhOzhQYMMLL0qnyQMA',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7j--YXygED6qUI9am_1IteTIwQ6M13S_gfoyefpgpXqtZSbyCdivnYq5ynfyUPhhgYMMLJI3Aal3g',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij73--YXygED6rkRuZGDxLYCddlc3MFzSrlDslOfr1J_uup7MzHUxviUjtimPmxWyhAYMMLLRA6IwHA',
          },
        ],
      },
      '★ Karambit | Gamma Doppler': {
        phases: [
          {
            phase: 'Emerald',
            paint_index: 568,
            image: null,
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image: null,
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image: null,
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image: null,
          },
        ],
      },
      '★ M9 Bayonet | Gamma Doppler': {
        phases: [
          {
            phase: 'Emerald',
            paint_index: 568,
            image: null,
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image: null,
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image: null,
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image: null,
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image: null,
          },
        ],
      },
      '★ Gut Knife | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09u3mY2KqPP7I6vdk3lu-M1wmeyVyoD8j1yg5UFpMjj7cI_Bdw43aVDXq1HrkOa8hpHttcuamyc16CIqsHzZzEPhhB5SLrs4pq3t99M',
          },
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09u3mY2KqPP7I6vdk3lu-M1wmeySyoD8j1yg5RVoYTr1JISRIVI9YF_Tq1K-xujm18C8upnBn3c2uiQr5SqIzEbightSLrs4_I3x9uU',
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09u3mY2KqPP7I6vdk3lu-M1wmeyTyoD8j1yg5RZrY26iItOTewQ3N1DVqFG9yObrh8W8uZnBmnRm6XYi53vfyhCxgBFSLrs4Q3CxbRA',
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09u3mY2KqPP7I6vdk3lu-M1wmeyQyoD8j1yg5UJpNzr1IoacJw87NQvWrFm2kuzmhpLvu86bnXdr6CkqtnvfzUexiR5SLrs4WJI7K_Y',
          },
          {
            phase: 'Emerald',
            paint_index: 568,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09m7kZKKm_PLPrrDlGdU4d90jtbN_Iv9nBqw_RZrZT-mdoKXewNtMljZ_Fe2k7jo1Me_6J_AnXdn6CcnsXvUnBewn1gSORrHSHKb',
          },
        ],
      },
      '★ Navaja Knife | Doppler': {
        phases: [
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqW9e-NV9j_v-5YT0m1HmlB81NDG3OteTJAI2aA3X-lLvyOm90ZTq6ZTMyyZn73Yns3zVzhzjhElMbOxnjKGACQLJGRfIdvo',
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqWld6cZ6muzA54DKhVWmqR85OiOmcOnJK1FmJUaG8lC6yOi9gpK_6pnAyCMx7yQj5X-MzEDkhRwaOOdtjKOeTFvPA6ZKAuDcUc1-OAYs',
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqXhQ-NV5g_vEyoH0mla4rhomNj2ceN_CKkIgZlGFrlTrkrvp05TvtZjLzyBkvSl27HnVnxzkgkxPO-Rq1PGfQFSeVbsJQvdNKOrsxg',
          },
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqW9e-NV9j_v-5YT0m1HglB81NDG3Oo-WIAc3ZwnWqwLokL--h5e0uZScwXMy6XQmsXmPnkSw0BwebrNngfCACQLJCQUjPAE',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqW9e-NV9j_v-5YT0m1HnlB81NDG3OtWQIVA6Nw7Q-FLvxe3qhZC17cnJm3c16yV05n3fm0S_gxEYO-Bq1qGACQLJK3Emelg',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqXlE6txOh-jT94DwgU6xrywwOj6rYJiVdAU9YA3Zr1e5yO65hsDptM-dm3dmuHMk7HjUzEaygklLPeJs1KHIVxzAUCe1nA0-',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqW9e-NV9j_v-5YT0m1HllB81NDG3OoCScwdtZliBrlG_yO7mgZe0tJzJmiZnvCUit3fdzBWz105Ia7FrgKCACQLJpugb92I',
          },
        ],
      },
      '★ Falchion Knife | Doppler': {
        phases: [
          {
            phase: 'Phase 4',
            paint_index: 421,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20k_jkI7fUhFRB4MRij73--YXygED6-hE-MTrwIILAcFI-MF3T_1O-wu_o0Z_o75vLnHRnvXF27S6JmkCw0gYMMLI6TjKvJQ',
          },
          {
            phase: 'Ruby',
            paint_index: 415,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20heL2KoTcl3lT5MB4kOzFyoD8j1yg5UdpNWr0LILEdwA5ZFjU8ge2yLvogZS8u8vBwXM26XR35H-JmRXh1RpSLrs4sYNFFPM',
          },
          {
            phase: 'Phase 2',
            paint_index: 419,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20k_jkI7fUhFRB4MRij7v--YXygED6rUVrZDz1INPAI1BsYFCCqFa4k-fu1pK8uM_Bz3pn7igq5Xzcm0e-1QYMMLITmyIC2Q',
          },
          {
            phase: 'Phase 3',
            paint_index: 420,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20k_jkI7fUhFRB4MRij7r--YXygED6rxE_NWumcIfGJFA_YA6CqFO5yb29hcTt6szLzyNluCMh4XaJyxK_iQYMMLInUpH_sQ',
          },
          {
            phase: 'Phase 1',
            paint_index: 418,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20k_jkI7fUhFRB4MRij7j--YXygED6rURpam7yd4WccAM6NVCCqVjsyLzrjZK0tMyYy3pksyN343vbnEPi1AYMMLKADFyYbQ',
          },
          {
            phase: 'Black Pearl',
            paint_index: 417,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20lfv1MLDBk2pD5Pp8i_vD-Yn8klGwlB81NDG3OoPDegM-MlqF-Fe9l-q81Me_vsvMm3Fg6XRzsyndyUS-0xodOORo1PKACQLJFZ2wbr8',
          },
          {
            phase: 'Sapphire',
            paint_index: 416,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20hPbkI7PYhG5u5cRjiOXE_JbwjGu4ohQ0J3ehIY6ScAc2YAmGqQXrwLy-h8DqtZ2awHVls3Uity3Unke01UlPO-c5m7XAHt7Rz6gd',
          },
        ],
      },
      '★ Falchion Knife | Gamma Doppler': {
        phases: [
          {
            phase: 'Phase 3',
            paint_index: 571,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQeLpxo7Oy3tItKVdw44ZFGC_AC2wrzugpTp7ZTBy3s2vHInt33anRK10hoePLdm1uveFwvuNmgo_A',
          },
          {
            phase: 'Phase 4',
            paint_index: 572,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQCLpxo7Oy3tIoeddQM_ZFuErAfvwbrngJLuuJjJnyNguXUi4imImRazgx9FaOI80eveFwuRoaePPQ',
          },
          {
            phase: 'Emerald',
            paint_index: 568,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20kvrxIbrdklRc6ddzhuzI74nxt1i9rBsofTrwdoSVdg9vMlHQqFC9xeq5hZO9v8_KyXVisnUmty7bnBLih0xMbLNxxavJOmCQpM4',
          },
          {
            phase: 'Phase 1',
            paint_index: 569,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQWLpxo7Oy3tctWcd1c4aFqF_la-wrq60JO5vJTNyyE1viYmsXbYyxS20x4aa-xp1uveFwvoXyTxzg',
          },
          {
            phase: 'Phase 2',
            paint_index: 570,
            image:
              '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQaLpxo7Oy3tJdScd1Q6NF2E8gO9l-rshZC5uZvPm3Fk6SdxtirUmBLjgkwfaO1q1-veFwvZayBTJg',
          },
        ],
      },
    };

    const getIconHash = (iconUrl) =>
      iconUrl
        .replace('https://community.cloudflare.steamstatic.com/economy/image/', '')
        .replace(/\/\d\dfx\d\df$/, '')
        .trim();

    // Detect phase of the knife
    const detect = (market_hash_name, icon_url, phaseForDebug = false) => {
      const name = market_hash_name
        .replace(/\(.+\)/, '')
        .replace(' StatTrak™', '')
        .trim();
      let itemPhase = false;

      if (phases[name]) {
        phases[name].phases.forEach((phaseData) => {
          if (phaseData.image === getIconHash(icon_url)) {
            itemPhase = PHASE[phaseData.phase.toLowerCase()];
          }
        });
      }

      return itemPhase;
    };

    // Detect phase by image url
    const detectByImageUrl = (imageUrl) => {
      const hash = getIconHash(imageUrl);

      //TODO: EDITED THIS

      // if (!hash) return false;
      //
      // for (const dopplerType of DOPPLER_TYPES) {
      //   const knifes = KNIFES_PHASES[dopplerType];
      //
      //   if (!knifes) return false;
      //
      //   for (let phases of Object.values(knifes)) {
      //     if (phases[hash]) return phases[hash];
      //   }
      // }

      return false;
    };

    // Debug: check knife`s phase using "float-data" (that contains exact info about phase - paintindex)
    const debug = (market_hash_name, icon_url, paintindex) => {
      const [realPhaseKey] = Object.entries(PHASE).find(([_, { code }]) => PHASE_CODES[paintindex].includes(code));
      const realPhase = PHASE[realPhaseKey];

      const phase = detect(market_hash_name, icon_url, realPhase);

      if (!phase || !realPhase || phase.code !== realPhase.code) {
        console.warn(`KnifePhaseDetector Debug: phase is not correct for knife "${market_hash_name}"`, {
          phase,
          realPhase,
        });
      }
    };

    return {
      detect,
      detectByImageUrl,
      debug,
    };
  })();
