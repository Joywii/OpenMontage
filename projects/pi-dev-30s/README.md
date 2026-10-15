# Pi: What You Can Build in 30 Seconds

A Chinese-language, portrait explainer about building with [Pi](https://pi.dev/docs/latest).

## Deliverable

- Final video: [renders/pi-dev-30s.mp4](renders/pi-dev-30s.mp4)
- Format: 1080 x 1920, 30 fps, 900 frames (30 seconds of video).
- Narration: approved youthful male Chinese voice, Xiaotian 2.0.
- Composition: bespoke Remotion project, composition ID `PiBuild30`.

The repository includes composition source, scripts, research, production decisions,
checkpoints, voice samples, narration, mixed soundtracks, review frames, and the final
video. Superseded versions are retained as production history, not current choices.
See `artifacts/render_report.json` and `artifacts/final_review.json` for verification
details and limitations. Independent ASR verification was not completed.

## Local-Only Files

This is a source and production-artifact archive, not a full machine backup.
Credentials (`.env`), installed dependencies, Python environments, runtime caches,
OS metadata, temporary review frames, and duplicate Remotion staging directories
are not uploaded. Raw TTS response sidecars (`assets/audio/*.mp3.json`) are excluded
because they contain temporary provider download URLs. Approved timing metadata is
preserved in `artifacts/audio_timing.json`.

The unmodified background track `assets/music/background.mp3` is intentionally
excluded: its license prohibits standalone redistribution. The narrated mixes and
finished audiovisual work are included, not a standalone music download.

## Music and Licensing

Background music: **Technology Ambient** by **VelarioMusic**, from
[Pixabay](https://pixabay.com/music/ambient-technology-ambient-613800/), under the
[Pixabay Content License](https://pixabay.com/service/license-summary/).
The track was labeled AI-generated and Content ID registered at acquisition.
Consult `artifacts/music_license.json` and the provider terms before reuse. Obtain
the original from the source if you need to rebuild the mix; do not redistribute
the original as a standalone file. Third-party media retains its own terms.

The upstream OpenMontage source and history retain the root `LICENSE` (AGPL-3.0)
and their existing attribution. This archive does not relicense third-party media.

## Reuse and Rendering

Start with the repository's installation instructions for Python, Node, FFmpeg,
and `remotion-composer` dependencies. The original render used Node 22, local
Chrome on macOS, and Remotion concurrency 1. `composition/render.config.ts`
captures the opt-in local browser settings (`OPENMONTAGE_PI_RENDER=1`); adapt the
browser executable path for your machine.

Use `composition/index.tsx` as the entry point and `PiBuild30` as the composition.
The canonical props are in `artifacts/render_props.json`; stage `public/audio/`
under the renderer's public directory. The approved mix is already included,
so rendering the existing cut does not require the standalone music track or a
new TTS call. Use the premixed `audio` props without adding narration a second time.

Historical artifacts contain absolute paths from the original workstation. Rebase
those paths to your checkout before running the pipeline; the archive is not
claimed to be a one-command portable render. Follow `AGENT_GUIDE.md` and the
`animated-explainer` pipeline when creating or revising production outputs.
