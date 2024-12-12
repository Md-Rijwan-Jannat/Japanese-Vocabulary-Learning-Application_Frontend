'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TLesson } from '@/types';
import { format } from 'date-fns';
import { TruncatedCell } from '../../ui/truncatedCell';
import NoData from '@/components/shared/noData';

export default function CompleteLessonTable({
  lessons,
}: {
  lessons: TLesson[];
}) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-purple-500">
          Resent Complete Lessons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons?.map((lesson: TLesson) => (
                <TableRow key={lesson._id}>
                  <TableCell className="font-medium">
                    <TruncatedCell content={lesson.name} />
                  </TableCell>
                  <TableCell>
                    <TruncatedCell content={`${lesson.number}`} />
                  </TableCell>
                  <TableCell>
                    {/* date-fns time format */}
                    <TruncatedCell
                      content={format(lesson.createdAt, 'h:mm a')}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="bg-green-100 rounded-md text-center text-green-500 p-0.5 border">
                      {' '}
                      <TruncatedCell content={'Complete'} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {lessons?.length === 0 && <NoData />}
        </div>
      </CardContent>
    </Card>
  );
}
