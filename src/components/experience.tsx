import { format, intervalToDuration, formatDuration } from 'date-fns'
import { jobs } from '@/lib/experience'

export function Experience() {
  return (
    <>
      <h2 className="mt-16 font-heading text-xl font-bold">Experience</h2>

      <div className="mt-6 flex flex-col gap-8">
        {jobs.map((job) => {
          const startDate = format(job.startDate, 'LLL, yyyy')
          const endDate = job.endDate ? format(job.endDate, 'LLL, yyyy') : 'Present'

          const durationObj = intervalToDuration({
            start: job.startDate,
            end: job.endDate ?? new Date(),
          })

          const durationFormat =
            durationObj.years || durationObj.months
              ? (['years', 'months'] as const)
              : (['days'] as const)

          const duration = formatDuration(durationObj, {
            format: [...durationFormat],
          })

          return (
            <div key={`${job.jobTitle}-${job.companyName}`}>
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="link-fade font-semibold"
              >
                {job.companyName}
              </a>

              <p>
                {job.jobTitle} <span className="text-muted">• {job.jobType}</span>
              </p>

              <p className="text-sm text-subtle">
                {startDate} &#8212; {endDate} • {duration}
              </p>

              {job.detail && <p className="mt-1">{job.detail}</p>}
              {job.stack && <p className="text-sm text-subtle">{job.stack}</p>}
            </div>
          )
        })}
      </div>
    </>
  )
}
